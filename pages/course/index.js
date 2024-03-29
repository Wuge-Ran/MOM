// pages/course/index.js
import {
  getCourseByDate,
  getCoursesByAllFields,
  getCoachList,
} from "@src/api/course";
import { getNextDay, getDayOfWeek } from "@utils/util";
import globalData from "@src/global/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dateList: [],
    message: "",
    curDay: "",
    triggered: false,
    courses: [],
    filterCourses: [],
    visible: false,
    selectDetail: "",
    courseType: "group, open",
    coachIds: [],
    coachList: [],
    refreshInterval:15*1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.init();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    this.getTabBar()?.show();
    await this.getCalendar(true);
    this.updateCourse();
    this.getCoach();
    this.setRefreshTimer();
  },

  onHide(){
    console.log('clearInterval',globalData.course.timer);
    clearInterval(globalData.course.timer);
    globalData.course.timer=undefined;
  },

  onUnload(){
    console.log('clearInterval',globalData.course.timer);
    clearInterval(globalData.course.timer);
    globalData.course.timer=undefined;
  },

  setRefreshTimer(){
    const timerId = globalData.course.timer;
    if(timerId) clearInterval(timerId);
    globalData.course.timer =setInterval(()=>{
      this.onRefresh();
    },this.data.refreshInterval)
  },

  async init() {    
    await this.getCalendar();
    this.updateCourse();

    console.log('===getDayOfWeek',getDayOfWeek('2023-12-11'))
  },

  /**
   *获取日历
   */
  async getCalendar(isSet) {
    const dateList = [];
    const { courseType, coachIds } = this.data;
    const coachIdStr = coachIds.join(",");
    const { data } = await getCourseByDate(courseType, coachIdStr);
    let curDay = data.today;
    // 设置当前日期
    if(!isSet){
        this.setData({ curDay });
    }
    
    data.future_courses.forEach((item) => {
      dateList.push({
        date: curDay,
        weekday: getDayOfWeek(curDay),
        hasCourse: item !== 0,
      });
      curDay = getNextDay(curDay);
    });
    this.setData({ dateList });
  },

  /**
   * 日期变更
   */
  onDateChange(value) {
    console.log("====onDateChange", value.detail);
    this.setData({ curDay: value.detail });
    this.updateCourse();
  },

  /**
   * 获取教练
   */

  getCoach() {
    getCoachList().then(({ data }) => {
      console.log("====data", data);
      const res = data.coaches.map((item) => ({
        name: item.nickname,
        id: item.coach_id,
        image: item.avatar_url,
        like: item.liked_by_user,
      })).sort(function(a, b) {
        // 将 like 为 true 的元素排在前面
        return (b.like || 0) - (a.like || 0);
      });
    ;
      this.setData({
        coachList: res,
      });
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

  onBarIconClick() {
    this.setData({
      visible: true,
    });
  },
  onOk(event) {
    const { detail } = event;
    const ids = [];
    detail.forEach((item) => {
      ids.push(item.id);
    });
    const filterCourses = ids.length
      ? this.data.courses.filter((item) => ids.indexOf(item.coach_id) !== -1)
      : this.data.courses;

    console.log("====onOk", detail,filterCourses);
    this.setData({
      visible: false,
      selectDetail: detail.map((item) => item.name).join("，"),
      coachIds: ids,
      filterCourses,
    });
  },

  onRefresh() {
    this.updateCourse();
  },

  async updateCourse() {
    const curDay = this.data.curDay;

    this.setData({ triggered: true });
    const resp = await getCoursesByAllFields(curDay, curDay);
    const coursesAllType = resp?.data?.courses || [];
    // const courses=coursesAllType;
    const courses = coursesAllType.filter(
      (item) => item.type === "group" || item.type === "open"
    );
    const filterCourses = this.data.coachIds.length
      ? courses.filter(
          (item) => this.data.coachIds.indexOf(item.coach_id) !== -1
        )
      : courses;
    this.setData({ triggered: false,courses, filterCourses });
  },
});
