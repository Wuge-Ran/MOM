// pages/card/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    successTitle: "",
    displayName: "",
    coachNickname: "",
    address: "",
    time: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { successTitle, displayName,coachNickname,address,time} = options;
    this.setData({successTitle, displayName,coachNickname,address,time});
  },

  /**
   * 继续约课
   */
  onContinueTap(event) {
    wx.switchTab({
      url: `/pages/course/index`,
    });
  },

  /**
   * 已预约
   */
  onConfirmTap(event) {
    wx.switchTab({
      url: `/pages/contracted/index`,
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