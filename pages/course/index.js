// pages/course/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    courseList: [
      {
        coach_nickname: "Leo",
        coach_avatar: "/assets/images/avatar.png",
        display_name:"初级团课",
        start_time: "2023-11-12 08:00:00",
        status: 0,
        duration_minutes:60,
        max_attenders: 5,
        current_attenders: 3,
        waiting_attenders:0
      },
      {
        coach_nickname: "Leo",
        coach_avatar: "/assets/images/avatar.png",
        display_name:"初级团课",
        start_time: "2023-11-13 08:00:00",
        status: 0,
        duration_minutes:60,
        max_attenders: 5,
        current_attenders: 3,
        waiting_attenders:0
      },
      {
        coach_nickname: "Leo",
        coach_avatar: "/assets/images/avatar.png",
        display_name:"初级团课",
        start_time: "2023-11-13 08:00:00",
        status: 1,
        duration_minutes:60,
        max_attenders: 5,
        current_attenders: 3,
        waiting_attenders:0
      },
      {
        coach_nickname: "Leo1",
        coach_avatar: "/assets/images/avatar.png",
        display_name:"初级团课",
        start_time: "2023-11-13 08:00:00",
        status: -2,
        duration_minutes:60,
        max_attenders: 15,
        current_attenders: 15,
        waiting_attenders:2
      },
      {
        coach_nickname: "Leo3",
        coach_avatar: "/assets/images/avatar.png",
        display_name:"初级团课",
        start_time: "2023-11-14 08:00:00",
        status: -1,
        duration_minutes:60,
        max_attenders: 5,
        current_attenders: 5,
        waiting_attenders:0
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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

  /**
   * 下拉菜单被触发
   */
  onRefresh(){
    
  }

});
