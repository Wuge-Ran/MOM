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
    showPurchaseUI: false,
    course: {},
  },

  computed: {
    timeRangeStr(data) {
      const { start_time, duration_minutes = 0 } = data.course||{ };
      const s = dayjs(start_time);
      const endDate = s.add(duration_minutes, "m");
      return `${s.format("MM/DD（ddd）hh:mm")}-${endDate.format("hh:mm")}`;
    },

    bookStr(data) {
      const {current_attenders,max_attenders,status}= data.course||{ };
      //
      let bookStr=`已约人数 ${data.course.current_attenders}/${data.course.max_attenders}`;
      if(current_attenders>=max_attenders){
        if(status===0){
            bookStr=`已约人数 ${data.course.current_attenders}/${data.course.max_attenders}`;
        }
      }
      return bookStr;
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { courseId = "CMock1611Group", showPurchaseUI = false } = options;
    this.setData({ courseId, showPurchaseUI });
    this.getCourseDetail(courseId, showPurchaseUI);
  },

  async getCourseDetail(courseId) {
    const course = (await getCourseById(courseId))?.data?.course;
    console.log("getCourseDetail:",course);
    this.setData({ course });
  },

  onCancelTap(event) {
    console.log("取消");
  },

  onConfirmTap(event) {
    this.setData({ showPurchaseUI: true });
  },

  onConfromUIVisiableChange(event) {
    this.setData({ showPurchaseUI: event.detail.visible });
  },

  onOtherCoachTap() {
    wx.navigateTo({
      url: "/pages/course/coach-detail/index",
    });
  },
  onMapTap() {
    wx.getLocation({
      type: "gcj02", //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
        });
      },
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
