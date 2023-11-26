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
  getCourseCards,
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

    course: {},
    cancelBookDisabledStr: "",
    cancelBookDisabled: true,
    started: true,

    // 底部按钮状态
    status: {},
    timeStr: "",

    //控制取消预约或取消候补弹窗是否展示
    showDialogConfirm: false,
    dialogConfirmBtn: {
      content: "确定",
      variant: "base",
    },

    // 候补或预约底部弹窗是否展示
    showPurchaseUI: false,

    //会员卡
    cardsChooseUIVisible: false,
    cards: [
      { value: 1, label: "单人私教10次卡" },
      { value: 2, label: "单人私教20次卡" },
    ],
    choosedCard: undefined,
    remark: "",
  },

  computed: {
    timeRangeStr(data) {
      const { start_time, duration_minutes = 0 } = data.course || {};
      const s = dayjs(start_time);
      const endDate = s.add(duration_minutes, "m");
      const result = `${s.format("MM/DD（ddd）hh:mm")}-${endDate.format(
        "hh:mm"
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

    reConfirmBuyStr(data){
      let str="";
      const {current_attenders,max_attenders}=data.course;
      if(data.cards.length>0){
        if(current_attenders<max_attenders)str="确认预约";
        else str="确认候补";
      }else{
        str="购买会员卡"
      }
      console.log(str);
      return str;
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const showPurchaseUI = options.showPurchaseUI === "true" ? true : false;
    const { courseId = "CMock2110Group" } = options;
    this.setData({ courseId, showPurchaseUI });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.init();
  },

  async init() {
    const { courseId } = this.data;
    await this.getCourseDetail(courseId);
    const started = this.calCourseStarted();
    const [cancelBookDisabled, cancelBookDisabledStr] =
      this.calCancelBookDisabled();
    const status = this.calStatus(started, cancelBookDisabled);
    this.getVipCards();
    this.setData({
      started,
      status,
      cancelBookDisabledStr,
      cancelBookDisabled,
    });
  },

  async getCourseDetail(courseId) {
    const course = (await getCourseById(courseId))?.data?.course;
    console.log("getCourseDetail:", course);
    this.setData({ course });
  },

  async getVipCards(courseId) {
    // const cards = (await getCourseCards(courseId))?.data?.cards||[];
    const cards = this.data.cards;
    console.log("getVipCards:", cards);
    const [fistCard] = cards;
    this.setData({ cards, choosedCard: fistCard });
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
    const {
      user_can_cancel_reserve: canCancelBook,
      user_can_reserve: canBook,
      user_can_wait: canWait,
      status,
    } = data?.course || {};
    //是否已开课
    const statusInfo = {
      cancel: { disabled: false, visible: false, text: "未知" },
      confirm: { disabled: false, visible: false, text: "未知" },
    };
    if (started) {
      statusInfo.confirm = { disabled: true, visible: true, text: "已开课" };
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
    } else if (canCancelBook) {
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
    const deadline = this.data.cancelBookDeadline || 5;
    const {
      user_can_cancel_reserve: canCancelBook,
      type,
      current_attenders: bookNum,
      start_time,
    } = this.data.course || {};
    if (canCancelBook) {
      const isBeforefiveHourse = dayjs()
        .add(deadline,"h")
        .isBefore(dayjs(start_time));
      if (type === "open") {
        // 公开课随时可以取消预约
        disabled = false;
      } else if (isBeforefiveHourse) {
        // 如果距离开课时间大于5小时,可取消预约
        disabled = false;
      } else {
        disabledStr = "开课前5小时内，不允许取消预约";
      }
    }

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
    await this.getVipCards();
  },

  async onBookTap(event) {
    this.setData({ showPurchaseUI: true });
    await this.getVipCards();
  },

  onConfromUIVisiableChange(event) {
    this.setData({ showPurchaseUI: event.detail.visible });
  },

  onOtherCoachTap(event) {
    wx.navigateTo({
      url: `/pages/course/coach-detail/index?id=${event.currentTarget.dataset.id}`,
    });
  },

  onMapTap() {
    const { address_lat = 0, address_long = 0 } = this.data.course || {};
    wx.openLocation({
      latitude: Number(address_lat),
      longitude: Number(address_long),
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
  onConfirmTap1() {
    if (this.data.cards.length > 0) {
      //有卡，预约或候补
      const courseId = this.data.courseId;
      const { user_can_reserve: canBook, user_can_wait: canWait, status, } = this.data?.course || {};
      const  requestRunc = canBook?book:wait;
      const successTitle= canBook?"预约成功":"候补成功";
      
      requestRunc(courseId, this.data.choosedCard.value).then((resp) => {
        if (resp?.data?.result === 0) {
          //预约或候补成功
          this.setData({ showPurchaseUI: false });
          const { address, coach_nickname, display_name } = this.data.course;
          const param = { successTitle, displayName: display_name, coachNickname: coach_nickname, address, time: this.data.timeStr, };
          const paramURI = queryString(param);
          wx.navigateTo({
            url: `/pages/course/book/success/index${paramURI}`,
          });
        } else {
          //预约或候补失败
          Toast({ context: this, selector: "#t-toast", message: resp?.data?.message, });
        }
      });
    } else {
      // 无卡，跳转到购卡首页
      wx.switchTab({
        url: `/pages/card/index`,
      });
    }
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
      }else{
        Toast({ context: this, selector: "#t-toast", message: resp?.data?.message, });
      }
    });
  },

  fecthCancelWait() {
    const courseId = this.data.courseId;
    cancelWait(courseId).then((resp) => {
      if (resp?.data?.result === 0) {
        this.init();
        Toast({ context: this, selector: "#t-toast", message: "取消成功" });
      }else{
        Toast({ context: this, selector: "#t-toast", message: resp?.data?.message, });
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
