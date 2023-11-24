// pages/course/index.js
import { getCourseRecord } from "@src/api/course";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    triggered: false,
    activeTab: 1,
    tabs: [
      { key: 1, value: "共{0}节已约" },
      { key: -1, value: "共{0}节候补" },
      { key: 0, value: "共{0}节已完成" },
    ],
    courses: [{}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.updateBooked();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().show();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  onRefresh() {
    this.updateBooked();
  },

  onTabsChange(event) {
    this.setData({activeTab:event.detail.value})
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {},

  async updateBooked() {

    this.setData({ triggered: true });
    const resp = await getCourseRecord("reserved,waiting,checkedin");
    const courses = resp?.data?.courses || [];

    let bookedNum = 0;
    let standbyNum = 0;
    let doneNum = 0;
    const typedCourses = [];

    for (const course of courses) {
      // 分类统计数量
      
      if (course.status === 1) bookedNum++; //已预定课数
      else if (course.status === -1) standbyNum++; //候补课数
      else doneNum++; //已完成课数

      //active tab 下具体列表内容
      // if(this.data.activeTab==)
      if (course.status === this.data.activeTab) {
        typedCourses.push(course);
      }
    }

    //更新tabs
    const [bookedTab, standbyTab, doneTab] = this.data.tabs;
    bookedTab.value=bookedTab.value.format(bookedNum);
    standbyTab.value=standbyTab.value.format(standbyNum);
    doneTab.value=doneTab.value.format(doneNum);
    const tabs =[bookedTab,standbyTab,doneTab]
    console.log("updateBooked:", typedCourses,this.data);

    this.setData({ triggered: false, tabs, });
    this.setData({courses:typedCourses})
  },
});
