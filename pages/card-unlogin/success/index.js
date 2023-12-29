import globalData from "@src/global/index";
// pages/card/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    card: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("succCard:",globalData.curBuyCard);
    this.setData({ card: globalData.curBuyCard });
  },

  /**
   * 继续购卡
   */
  onContinueTap(event) {
    wx.switchTab({
      url: `/pages/card/index`,
    });
  },

  /**
   * 约课
   */
  onConfirmTap(event) {
    wx.switchTab({
      url: `/pages/course/index`,
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
