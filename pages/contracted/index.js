// pages/course/index.js
import { getCourseRecord } from "@src/api/course";
import dayjs from "dayjs";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    triggered: false,
    activeTab: 1,

    bookedTab: { key: 1, value: "共0节已约", templete: "共{0}节已约" },
    standbyTab: { key: -1, value: "共0节候补", templete: "共{0}节候补" },
    doneTab: { key: 0, value: "共0节已完成", templete: "共{0}节已完成" },
    courses: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar()?.show();
    this.updateBooked();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  onRefresh() {
    this.updateBooked();
  },

  onTabsChange(event) {
    this.setData({ activeTab: event.detail.value });
    this.updateBooked();
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {},

  calIsCourseCompleted(course) {
    const { start_time, duration_minutes = 0 } = course;
    const startDate = dayjs(start_time);
    return startDate.isBefore(dayjs());
  },

  updateTabs(bookedNum = 0, standbyNum = 0, doneNum = 0) {
    const { bookedTab, standbyTab, doneTab } = this.data;
    bookedTab.value = bookedTab.templete.format(bookedNum);
    standbyTab.value = standbyTab.templete.format(standbyNum);
    doneTab.value = doneTab.templete.format(doneNum);

    this.setData({
      bookedTab,
      standbyTab,
      doneTab,
    });
  },

  async updateBooked() {
    const resp = await getCourseRecord("reserved,waiting,checkedin,noshow");
    const courses = resp?.data?.courses || [];

    let bookedNum = 0;
    let standbyNum = 0;
    let doneNum = 0;
    const typedCourses = [];

    for (const course of courses) {
      const { attend_status: status } = course;
      // 分类统计数量
      if (status === "reserved") bookedNum++; //已预定课数
      else if (status === "waiting") standbyNum++; //候补课数
      else if (status === "checkedin" || status === "noshow") doneNum++; //已完成课数

      //active tab 下具体列表内容
      // if(this.data.activeTab==)
      if (this.data.activeTab === 1 && status === "reserved") {
        typedCourses.push(course);
      } else if (this.data.activeTab === -1 && status === "waiting") {
        typedCourses.push(course);
      } else if (
        this.data.activeTab === 0 &&
        (status === "checkedin" || status === "noshow")
      ) {
        typedCourses.push(course);
      }
    }
    console.log(
      "updateBooked:",
      courses,
      typedCourses,
      bookedNum,
      standbyNum,
      doneNum
    );
    this.updateTabs(bookedNum, standbyNum, doneNum);
    this.setData({ courses: typedCourses });
  },
});
