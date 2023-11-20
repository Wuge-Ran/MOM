// pages/course/book/index.js
// import globalData from "@src/global/index";
import dayjs from "dayjs";
// import locale from "@utils/dayjs/zh-cn";
import { getCourseById } from "@src/api/course";
const computedBehavior = require("miniprogram-computed").behavior;
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "/assets/images/avatar.png",
    courseId: "",
    cancelBookDeadline: 5,
    showPurchaseUI: false,
    course: {},
    cancelBookDisabledStr:"",
    cancelBookDisabled:true,
    started:true,
    status:{}
  },

  computed: {
    timeRangeStr(data) {
      const { start_time, duration_minutes = 0 } = data.course || {};
      const s = dayjs(start_time);
      const endDate = s.add(duration_minutes, "m");
      return `${s.format("MM/DD（ddd）hh:mm")}-${endDate.format("hh:mm")}`;
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
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { courseId = "CMock2110Group", showPurchaseUI = false } = options;
    await this.getCourseDetail(courseId, showPurchaseUI);
    const started =this.calCourseStarted();
    const [cancelBookDisabled,cancelBookDisabledStr]= this.calCancelBookDisabled();
    const status =this.calStatus(started,cancelBookDisabled);
    console.log("courseId:",courseId, "showPurchaseUI:",showPurchaseUI,"started:",started,"status:",status,"cancelBookDisabledStr:",cancelBookDisabledStr);
    this.setData({ courseId, showPurchaseUI,started,status,cancelBookDisabledStr,cancelBookDisabled });
  },

  async getCourseDetail(courseId) {
    const course = (await getCourseById(courseId))?.data?.course;
    console.log("getCourseDetail:", course);
    this.setData({ course });
  },

  calCourseStarted() {
    // 是否已开课
    const { start_time } = this.data.course || {};
    const startDate = dayjs(start_time);
    const started=startDate.isBefore(dayjs())
    console.log("courseStarted",started );
    // this.setData({ started});
    return started;
  },

  // 课程状态
  calStatus(started,cancelBookDisabled){
    const data = this.data;
    const {user_can_cancel_reserve:canCancelBook,user_can_reserve:canBook,user_can_wait:canWait,status} =data?.course ||{};
      //是否已开课
      const statusInfo = {
        cancel: { disabled: false, visible: false, text: "未知" },
        confirm: { disabled: false, visible: false, text: "未知" },
      };
      if (started) {
        statusInfo.confirm = { disabled: true, visible: true, text: "已开课" };
      } 
      else if (canBook) {
        statusInfo.confirm = { disabled: false, visible: true, text: "立即预约",onTap:this.onBookTap };
      } 
      else if (canWait) {
        statusInfo.confirm = { disabled: false, visible: true, text: "候补",onTap:this.onWaitTap };
      } 
      else if (canCancelBook) {
        statusInfo.cancel = { disabled:cancelBookDisabled, visible: true, text: "取消预约",onTap: this.onCancelBookTap };
        statusInfo.confirm = { disabled:false, visible: true, text: "继续约课",onTap:this.onContinueTap };
      } 
      else if (status<0) {
        statusInfo.cancel = { disabled: false, visible: true, text: "取消候补",onTap:this.oncancelWaitTap };
        statusInfo.confirm = { disabled:false, visible: true, text: "继续约课",onTap:this.onContinueTap };
      }
      return statusInfo;
  },

  /**
   * 计算取消预约按钮的点击状态
   */
  calCancelBookDisabled(){
    let disabled=true;
    let disabledStr="";
    const deadline =this.data.cancelBookDeadline || 5;
    const {user_can_cancel_reserve:canCancelBook,type,current_attenders:bookNum} =this.data.course || {};
    if(canCancelBook){
      const isBeforefiveHourse=dayjs(start_time).add(deadline).isBefore(dayjs());
      if(type==="open") {// 公开课随时可以取消预约
        disabled=false;
      }else if(isBeforefiveHourse){// 如果距离开课时间大于5小时,可取消预约
        disabled=false;
      }else {
        disabledStr="开课前5小时内，不允许取消预约";
      }
    }
    return [disabled,disabledStr];
  },

  onCancelBookTap(event) {
    console.log("取消");
  },

  oncancelWaitTap(event) {
    // this.setData({ showPurchaseUI: true });
  },

  onContinueTap(event) {
    // this.setData({ showPurchaseUI: true });
  },

  onWaitTap(event) {
    // this.setData({ showPurchaseUI: true });
  },
  onBookTap(event) {
    // this.setData({ showPurchaseUI: true });
  },

  onConfirmTap(event) {
    this.setData({ showPurchaseUI: true });
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
    const {address_lat=0,address_long=0} = this.data.course||{};
    wx.openLocation({
      latitude:Number(address_lat),
      longitude:Number(address_long),
      scale: 18,
      complete:(res)=>{
        console.log("wx.openLocation",res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
