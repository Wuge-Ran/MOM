// pages/course/index.js
import {
  getCourseByDate,
  getCoursesByAllFields,
  getCoachList,
} from "@src/api/course";
import { getNextDay, getDayOfWeek } from "@utils/util";

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
    courseType: "group, open, private, special",
    coachIds: [],
    coachList: [],
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
  onShow() {
    this.getTabBar()?.show();
    console.log("onshow", 454555);
    this.updateCourse();
  },

  async init() {
    await this.getCalendar();
    this.updateCourse();
    this.getCoach();
  },

  /**
   *获取日历
   */
  async getCalendar() {
    const dateList = [];
    const { courseType, coachIds } = this.data;
    const coachIdStr = coachIds.join(",");
    const { data } = await getCourseByDate(courseType, coachIdStr);
    let curDay = data.today;
    // 设置当前日期
    this.setData({ curDay });
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
      }));
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
    console.log("updateCourse:",coursesAllType, courses, filterCourses);
    this.setData({ triggered: false,courses, filterCourses });
  },
});
