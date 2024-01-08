// pages/course/book/index.js
import { queryString } from "@utils/util";
import dayjs from "dayjs";
// import locale from "@utils/dayjs/zh-cn";
import {
  getCourseById,
  cancelBook,
  cancelWait,
  book,
  wait,
  buySpecialCourse,
} from "@src/api/course";
const computedBehavior = require("miniprogram-computed").behavior;
import Toast from "tdesign-miniprogram/toast/index";
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "/assets/images/avatar.png",
    courseId: "",
    cancelBookDeadline: 5,

    course: undefined,
    cancelBookDisabledStr: "",
    cancelBookDisabled: true,
    started: true,

    // 底部按钮状态
    status: {},
    timeStr: "",
    firstLoad: true,

    //控制取消预约或取消候补弹窗是否展示
    showDialogConfirm: false,
    dialogConfirmBtn: {
      content: "确定",
      variant: "base",
    },
    //showPurchaseUI或showBuySpecialUI，根据courseType决定弹出哪种
    showPupoUI: false,

    // 候补或预约底部弹窗是否展示
    showPurchaseUI: false,

    //会员卡
    cardsChooseUIVisible: false,
    cards: [
      // { value: 1, label: "单人私教10次卡" },
      // { value: 2, label: "单人私教20次卡" },
    ],
    choosedCard: undefined,
    // selectKeys:{value:"id",label:"name"},
    remark: "",

    //特殊课程购买弹窗
    showBuySpecialUI: false,
    privacyChecked: false,

    //课程取消通知id
    cancelId: "",
    //课程候补成功通知id
    reservedId: "",
    bgUrl:'https://mellow-1321738484.cos.ap-shanghai.myqcloud.com/public/FNRf12QnjGrxcJDK8A0NIUidUwHCauA4/bg2.jpeg',
  },

  computed: {
    timeRangeStr(data) {
      const { start_time, duration_minutes = 0 } = data.course || {};
      const s = dayjs(start_time);
      const endDate = s.add(duration_minutes, "m");
      const result = `${s.format("MM/DD（ddd）HH:mm")}-${endDate.format(
        "HH:mm"
      )}`;
      data.timeStr = result;
      return result;
    },

    bookStr(data) {
      const { current_attenders, max_attenders, status } = data.course || {};
      let bookStr = `已约人数 ${data.course.current_attenders}/${data.course.max_attenders}`;
      if (current_attenders >= max_attenders) {
        if (status === 0) {
          bookStr = `已约人数 ${data.course.current_attenders}/${data.course.max_attenders}`;
        }
      }
      return bookStr;
    },

    reConfirmBuyStr(data) {
      let str = "";
      const { current_attenders, max_attenders } = data.course;
      if (data.cards.length > 0) {
        if (current_attenders < max_attenders) str = "确认预约";
        else str = "确认候补";
      } else {
        str = "购买会员卡";
      }
      console.log(str);
      return str;
    },

    openClassCantBookStr(data) {
      let str = "";
      const { user_can_reserve } = data.course;
      if (data.cards.length <= 0 && user_can_reserve) {
        str = "抱歉，您不是场馆会员，请先购买会员卡";
      }
      console.log("openClassCantBookStr:", str);
      return str;
    },

    openClassNoCards(data) {
      const { type } = data.course;
      if (data.cards.length <= 0 && type === "open") {
        return true;
      }
      return false;
    },

    openClassHasCards(data) {
      const { type } = data.course;
      if (data.cards.length > 0 && type === "open") {
        return true;
      }
      return false;
    },

    showBookStr(data) {
      const { type } = data.course || {};
      return type !== "private" && type !== "special";
      // return false;
    },

    showWaitStr(data) {
      const { type, user_can_wait } = data.course || {};
      return user_can_wait && type !== "private" && type !== "special";
      // return false;
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const showPupoUI = options.showPurchaseUI === "true" ? true : false;
    const { courseId = "CMock2110Group" } = options;
    this.setData({ courseId, showPupoUI });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.nextTick(() => {
      const app = getApp();
      const { last, current } = app.globalData?.routes || {};
      if (last?.path === "pages/course/book/success/index") {
        this.setData({ showPupoUI: false });
      }
      this.init();
    });
  },

  async init() {
    const { courseId } = this.data;
    await this.getCourseDetail(courseId);
    const type = this.data.course.type;
    const started = this.calCourseStarted();
    const [cancelBookDisabled, cancelBookDisabledStr] =
      this.calCancelBookDisabled();
    const status = this.calStatus(started, cancelBookDisabled);
    this.setData({
      started,
      status,
      cancelBookDisabledStr,
      cancelBookDisabled,
      showBuySpecialUI: type === "special",
      showPurchaseUI: this.data.showPupoUI && type !== "special",
    });
  },

  async getCourseDetail(courseId) {
    const resp = (await getCourseById(courseId))?.data;

    const {
      wxsubmsg_template_course_cancelled: cancelId,
      wxsubmsg_template_course_waiting_to_reserved: reservedId,
    } = resp || {};
    const course = resp?.course || [];
    const cardsOrigin = resp?.cardins_list || [];
    const cards = cardsOrigin.map((card) => ({
      value: card.cardins_id,
      label: card.cardcat_name,
      ...card,
    }));
    const [fistCard] = cards;
    // console.log("getCourseDetail:", course, cards);
    this.setData({
      course,
      cards,
      choosedCard: fistCard,
      cancelId,
      reservedId,
    });
  },

  calCourseStarted() {
    // 是否已开课
    const { start_time } = this.data.course || {};
    const startDate = dayjs(start_time);
    const started = startDate.isBefore(dayjs());
    console.log("courseStarted", started);
    // this.setData({ started});
    return started;
  },

  // 课程状态
  calStatus(started, cancelBookDisabled) {
    const data = this.data;
    const _ = this;
    const hasCards = data.cards.length > 0;
    const {
      user_can_cancel_reserve: canCancelBook,
      user_can_reserve: canBook,
      user_can_wait: canWait,
      status,
      type,
    } = data?.course || {};

    //是否已开课
    const statusInfo = {
      cancel: { disabled: false, visible: false, text: "未知" },
      confirm: { disabled: false, visible: false, text: "未知" },
    };
    if (started) {
      statusInfo.confirm = { disabled: true, visible: true, text: "已开课" };
    } else if (type === "special") {
      statusInfo.confirm = {
        disabled: false,
        visible: true,
        text: "立即报名",
        onTap: _.onSpecialCourseTap.bind(_),
      };
    } else if (canBook) {
      statusInfo.confirm = {
        disabled: false,
        visible: true,
        text: "立即预约",
        onTap: _.onBookTap.bind(_),
      };
    } else if (canWait) {
      statusInfo.confirm = {
        disabled: false,
        visible: true,
        text: "候补",
        onTap: _.onWaitTap.bind(_),
      };
    } else if (status < 0) {
      statusInfo.cancel = {
        disabled: false,
        visible: true,
        text: "取消候补",
        type: 2,
        onTap: _.oncancelWaitTap.bind(_),
      };
      statusInfo.confirm = {
        disabled: false,
        visible: true,
        text: "继续约课",
        onTap: _.onContinueTap.bind(_),
      };
    } else if (canCancelBook || cancelBookDisabled) {
      statusInfo.cancel = {
        disabled: cancelBookDisabled,
        visible: true,
        type: 1,
        text: "取消预约",
        onTap: _.onCancelBookTap.bind(_),
      };
      statusInfo.confirm = {
        disabled: false,
        visible: true,
        text: "继续约课",
        onTap: _.onContinueTap.bind(_),
      };
    }
    console.log("statusInfo", statusInfo);
    return statusInfo;
  },

  /**
   * 计算取消预约按钮的点击状态
   */
  calCancelBookDisabled() {
    let disabled = true;
    let disabledStr = "";
    const started = this.calCourseStarted();

    const {
      user_can_cancel_reserve: canCancelBook,
      type,
      status,
      attend_status,
      current_attenders: bookNum,
      start_time,
      no_cancel_reserve_hours,
    } = this.data.course || {};

    const deadline =
      no_cancel_reserve_hours || this.data.cancelBookDeadline || 5;
    if (canCancelBook) {
      disabled = false;
      // const isBeforefiveHourse = dayjs()
      //   .add(deadline, "h")
      //   .isBefore(dayjs(start_time));
      // if (type === "open") {
      //   // 公开课随时可以取消预约
      //   disabled = false;
      // } else if (isBeforefiveHourse) {
      //   // 如果距离开课时间大于5小时,可取消预约
      //   disabled = false;
      // } else if (type === "group" && bookNum < 3) {
      //   disabled = false;
      // } else {
      //   disabledStr = "开课前5小时内，不允许取消预约";
      // }
    } else if (attend_status === "reserved" && !started) {
      disabledStr = `开课前${deadline}小时内，不允许取消预约`;
    }
    console.log("calCancelBookDisabled",deadline, canCancelBook, disabled, disabledStr);
    return [disabled, disabledStr];
  },

  onCancelTap(event) {
    const cb = this.data.status?.cancel?.onTap;
    cb && cb(event);
  },

  onConfirmTap(event) {
    const cb = this.data.status?.confirm?.onTap;
    cb && cb(event);
  },

  onSpecialCourseTap(event) {
    this.setData({ showBuySpecialUI: true });
  },

  onCancelBookTap(event) {
    this.showDialog();
  },

  oncancelWaitTap(event) {
    this.showDialog();
  },

  onContinueTap(event) {
    wx.switchTab({
      url: `/pages/course/index`,
    });
  },

  async onWaitTap(event) {
    this.setData({ showPurchaseUI: true });
  },

  async onBookTap(event) {
    this.setData({ showPurchaseUI: true });
  },

  onPrivacyTap(event) {
    const chceked = !this.data.privacyChecked;
    this.setData({ privacyChecked: chceked });
  },

  onConfromUIVisiableChange(event) {
    this.setData({ showPurchaseUI: event.detail.visible });
  },

  onSpecialUIVisiableChange(event) {
    this.setData({ showBuySpecialUI: event.detail.visible });
  },

  onCoachTap(event) {
    wx.navigateTo({
      url: `/pages/course/coach-detail/index?id=${event.currentTarget.dataset.id}`,
    });
  },

  onMapTap() {
    const { address_lat = 0, address_long = 0,address } = this.data.course || {};
    wx.openLocation({
      latitude: Number(address_lat),
      longitude: Number(address_long),
      name:address,
      address:'北京市朝阳区506创新园7号楼',
      scale: 18,
      complete: (res) => {
        console.log("wx.openLocation", res);
      },
    });
  },

  showDialog() {
    this.setData({ showDialogConfirm: true });
  },

  closeDialog() {
    this.setData({ showDialogConfirm: false });
  },

  onReconfirmTap(event) {
    const type = this.data.status?.cancel?.type;
    if (type === 1) {
      this.fecthCancelBook();
    } else if (type === 2) {
      this.fecthCancelWait();
    }
    this.closeDialog();
  },

  //购卡或预约二次确认
  async onConfirmTap1() {
    //有卡，预约或候补流程
    if (this.data.cards.length > 0) {
      //由于微信机制，提前弹出订阅弹窗，用户操作后预约或候补
      const info = await this.subscribe();
    } else {
      // 无卡，跳转到购卡首页
      wx.reLaunch({
        url: `/pages/card/index`,
      });
    }
  },

  subscribe() {
    const { user_can_wait: canWait } = this.data?.course || {};
    const { cancelId,reservedId } = this.data;
    const tmplIds = [cancelId];
    if (canWait) tmplIds.push(reservedId);
    wx.requestSubscribeMessage({
     tmplIds,
      complete: (res)=> {
        console.log('complete',res);
        const cancelMsg=res?.[cancelId];
        const reservedMsg =res?.[reservedId]; 
        // 候补或购卡
        this.reverseOrWaitingCourse(cancelMsg,reservedMsg);
      },
    });
  },

  async reverseOrWaitingCourse(cancelMsg,reservedMsg) {
    const courseId = this.data.courseId;
    const {
      user_can_reserve: canBook,
      user_can_wait: canWait,
      status,
      waiting_attenders,
      min_attenders:minAttenders,
      no_cancel_reserve_hours:cancelHours
    } = this.data?.course || {};
    const requestRunc = canBook ? book : wait;
    const type = canBook ? "booked" : "wait";
    const waitPeo = canBook ? 0 : waiting_attenders + 1;
    const resp = await requestRunc(
      courseId,
      this.data.choosedCard.value,
      this.data.remark,
      cancelMsg,
      reservedMsg
    );
    if (resp?.data?.result === 0) {
      //预约或候补成功
      this.setData({ showPurchaseUI: false });
      const { address, coach_nickname, display_name } = this.data.course;
      const param = {
        type,
        displayName: display_name,
        coachNickname: coach_nickname,
        address,
        time: this.data.timeStr,
        waitPeo,
        cancelHours,
        minAttenders,
      };
      const paramURI = queryString(param);
      this.gotoSuccPage(paramURI);
    } else {
      //预约或候补失败
      Toast({
        context: this,
        selector: "#t-toast",
        message: resp?.data?.message,
      });
    }
  },
  gotoSuccPage(paramURI) {
    wx.navigateTo({
      url: `/pages/course/book/success/index${paramURI}`,
    });
  },

  //特殊课程购买逻辑
  onSpecialConfirmTap() {
    const courseId = this.data.courseId;
    buySpecialCourse(courseId).then((resp) => {
      if (resp?.data?.result === 0) {
        this.setData({ showBuySpecialUI: false });
        const { address, display_name } = this.data.course;
        const param = { type: "special", displayName: display_name, address };
        const paramURI = queryString(param);
        wx.navigateTo({
          url: `/pages/course/book/success/index${paramURI}`,
        });
      } else {
        //失败
        Toast({
          context: this,
          selector: "#t-toast",
          message: resp?.data?.message,
        });
      }
    });
  },

  onRemarkChange(event) {
    this.setData({ remark: event.detail.value });
  },

  onChooseCardTap(event) {
    this.setData({ cardsChooseUIVisible: true, showPurchaseUI: false });
  },

  onPickerClose() {
    this.setData({ cardsChooseUIVisible: false, showPurchaseUI: true });
  },

  onPickerChange(e) {
    console.log(e, "onPickerChange");
    const label = e.detail.label[0];
    const value = e.detail.value[0];
    const choosedCard = { label, value };
    this.setData({ choosedCard });
  },

  fecthCancelBook() {
    const courseId = this.data.courseId;
    cancelBook(courseId).then((resp) => {
      if (resp?.data?.result === 0) {
        this.init();
        Toast({ context: this, selector: "#t-toast", message: "取消成功" });
      } else {
        Toast({
          context: this,
          selector: "#t-toast",
          message: resp?.data?.message,
        });
      }
    });
  },

  fecthCancelWait() {
    const courseId = this.data.courseId;
    cancelWait(courseId).then((resp) => {
      if (resp?.data?.result === 0) {
        this.init();
        Toast({ context: this, selector: "#t-toast", message: "取消成功" });
      } else {
        Toast({
          context: this,
          selector: "#t-toast",
          message: resp?.data?.message,
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
