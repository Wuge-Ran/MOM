// pages/card/index.js

import { getCards } from "@src/api/card";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPurchaseUI: false,
    canBuy: false,
    privacyChecked: false,
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
    this.init();
  },

  async init() {
    const resp = await getCards();
    const cards =resp?.data?.cardcat_list||[];

    const cardsByType=this.calCardBtTypes(cards);
    console.log(cards);
  },
  
  calCardBtTypes(){

  },

  onCardTap() {
    this.setData({ showPurchaseUI: true });
  },

  onPrivacyTap(event) {
    const chceked = !this.data.privacyChecked;
    this.setData({ privacyChecked: chceked });
  },

  onConfromUIVisiableChange(event) {
    this.setData({ showPurchaseUI: event.detail.visible });
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
