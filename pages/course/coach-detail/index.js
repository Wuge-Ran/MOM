// pages/course/index.js
import {
  getCourseByDate,
  getCourseList,
  getCoachInfo,
  likeCoach,
  disLikeCoach,
} from "@src/api/course";
import { getNextDay, getDayOfWeek } from "@utils/util";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dateList: [],
    isLike: false,
    courseList: [],
    filterCourseList: [],
    coachInfo: null,
    coachId: null,
    courseType: "group,open",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("=options", options);
    const { id } = options;
    this.setData({
      coachId: id,
    });
    this.getInitInfo(id, this.data.courseType);
  },

  getInitInfo(id, type) {
    console.log(
      "%c [ id ]-37",
      "font-size:13px; background:pink; color:#bf2c9f;",
      id
    );
    getCoachInfo(id).then(({ data }) => {
      this.setData({
        coachInfo: data,
        isLike: data.liked_by_user,
      });
    });
    this.getCourseDate(type).then((curDay) => {
      this.updateList(curDay);
    });
    // this.getTabBar().show();
  },

  getCourseDate(type) {
    const dateList = [];
    return getCourseByDate(type, this.data.coachId).then(({ data }) => {
      let curDay = data.today;
      data.future_courses.forEach((item) => {
        dateList.push({
          date: curDay,
          weekday: getDayOfWeek(curDay),
          hasCourse: item !== 0,
        });
        curDay = getNextDay(curDay);
      });
      console.log("=dateList", dateList);
      this.setData({
        dateList,
      });
      return data.today;
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  onIconTap() {
    const isLike = !this.data.isLike;
    if (isLike) {
      likeCoach(this.data.coachId).then(() => {
        wx.showToast({
          title: isLike ? "收藏成功" : "已取消收藏",
          icon: "none",
        });
        this.setData({
          isLike,
        });
      });
    } else {
      disLikeCoach(this.data.coachId).then(() => {
        wx.showToast({
          title: isLike ? "收藏成功" : "已取消收藏",
          icon: "none",
        });
        this.setData({
          isLike,
        });
      });
    }
  },

  onTabsChange(e) {
    console.log(e.detail.value, this.data.courseList);
    const type = e.detail.value;
    this.setData({
      courseType: type,
    });
    this.getCourseDate(type);
    const filter = this.data.courseList.filter((item) => {
        const arr = type.split(',')
        console.log('=',this.data.courseList,arr)
        if(arr.length === 2){
            return arr.indexOf(item.type)!==-1;
        }
        return item.type === type
    });
    this.setData({
      filterCourseList: filter,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onDateChange(value) {
    this.updateList(value.detail);
  },

  updateList(curDay) {
    getCourseList({
      "from-date": curDay,
      "to-date": curDay,
      fields:
        "course_id, type, display_name, description, address, start_time, duration_minutes, max_attenders, current_attenders, waiting_attenders, coach_id, coach_nickname, coach_avatar_url, status",
    }).then((res) => {
        const type = this.data.courseType
      const courseList = res.data.courses.filter(
        (item) => item.coach_id === this.data.coachId
      );
      console.log("===getCourseList", courseList);
      const filter = courseList.filter((item) => {
        const arr = type.split(',')
        console.log('=',this.data.courseList,arr)
        if(arr.length === 2){
            return arr.indexOf(item.type)!==-1;
        }
        return item.type === type
    });
      this.setData({
        courseList,
        filterCourseList: filter,
      });
    });
  },

  navgateToBook(e) {
    console.log(e);
    wx.navigateTo({
      url: `/pages/course/book/index?courseId=${e.currentTarget.dataset.id}`,
    });
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  onCheckCoachInfo() {
    console.log(999);
    wx.navigateTo({
      url: `/pages/course/coach-info/index?id=${this.data.coachId}`,
    });
  },
});
