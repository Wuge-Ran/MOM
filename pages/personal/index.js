// pages/personal/index.js
import {getUserInfo} from '@src/api/personal'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTabBar().show();
        getUserInfo().then(({data})=>{
            console.log(data)
            this.setData({
                userInfo:data
            })
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    linkTo(e){
        const link = e.currentTarget.dataset.link;
        console.log(link)
        wx.navigateTo({
          url: link,
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})