// pages/course/index.js
import { getCourseByDate, getCoursesByAllFields } from "@src/api/course";
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
    visible:false,
    selectDetail:'',
    // courses: [{
    //     coach_nickname: "Leo",
    //     coach_avatar: "/assets/images/avatar.png",
    //     display_name: "初级团课",
    //     start_time: "2023-11-12 08:00:00",
    //     status: 0,
    //     duration_minutes: 60,
    //     max_attenders: 5,
    //     current_attenders: 3,
    //     waiting_attenders: 0
    //   },
    //   {
    //     coach_nickname: "Leo",
    //     coach_avatar: "/assets/images/avatar.png",
    //     display_name: "初级团课",
    //     start_time: "2023-11-13 08:00:00",
    //     status: 0,
    //     duration_minutes: 60,
    //     max_attenders: 5,
    //     current_attenders: 3,
    //     waiting_attenders: 0
    //   },
    //   {
    //     coach_nickname: "Leo",
    //     coach_avatar: "/assets/images/avatar.png",
    //     display_name: "初级团课",
    //     start_time: "2023-11-13 08:00:00",
    //     status: 1,
    //     duration_minutes: 60,
    //     max_attenders: 5,
    //     current_attenders: 3,
    //     waiting_attenders: 0
    //   },
    //   {
    //     coach_nickname: "Leo1",
    //     coach_avatar: "/assets/images/avatar.png",
    //     display_name: "初级团课",
    //     start_time: "2023-11-13 08:00:00",
    //     status: -2,
    //     duration_minutes: 60,
    //     max_attenders: 15,
    //     current_attenders: 15,
    //     waiting_attenders: 2
    //   },
    //   {
    //     coach_nickname: "Leo3",
    //     coach_avatar: "/assets/images/avatar.png",
    //     display_name: "初级团课",
    //     start_time: "2023-11-14 08:00:00",
    //     status: -1,
    //     duration_minutes: 60,
    //     max_attenders: 5,
    //     current_attenders: 5,
    //     waiting_attenders: 0
    //   },
    //   {
    //     coach_nickname: "Leo3",
    //     coach_avatar: "/assets/images/avatar.png",
    //     display_name: "初级团课",
    //     start_time: "2023-11-14 08:00:00",
    //     status: -1,
    //     duration_minutes: 60,
    //     max_attenders: 5,
    //     current_attenders: 5,
    //     waiting_attenders: 0
    //   },
    //   {
    //     coach_nickname: "Leo3",
    //     coach_avatar: "/assets/images/avatar.png",
    //     display_name: "初级团课",
    //     start_time: "2023-11-14 08:00:00",
    //     status: -1,
    //     duration_minutes: 60,
    //     max_attenders: 5,
    //     current_attenders: 5,
    //     waiting_attenders: 0
    //   },
    // ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getCalendar();
    this.updateCourse();
  },

  /**
   *获取日历
   */
  async getCalendar() {
    const dateList = [];
    const { data } = await getCourseByDate();
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().show();
  },

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

  onBarIconClick(){
    this.setData({
        visible:true
    })
  },
  onOk(event){
      const {detail}=event;
      console.log(detail);
      this.setData({
        visible:false ,
        selectDetail:detail.map(item=>item.name).join('，')
      })
  },
  
  onRefresh() {
    this.updateCourse();
  },

  async updateCourse() {
    const curDay="2023-11-12";
    // const curDay=this.data.curDay;

    this.setData({ triggered: true });
    const resp = await getCoursesByAllFields(curDay, curDay);
    const courses=resp?.data?.courses ||[];
    console.log('updateCourse:',resp,courses);
    this.setData({ triggered: false,courses });
  },
});
