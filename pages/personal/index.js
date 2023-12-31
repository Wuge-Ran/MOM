// pages/personal/index.js
import {
    getUserInfo
} from '@src/api/personal';
import globalData from '@src/global/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        avatarUrl: null
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
        this.getTabBar()?.show();
        const {
            phoneNumber,
            token
        } = globalData?.login || {};
        if (!phoneNumber || !token) { // 跳转到登录页
            return;
        }
        getUserInfo().then(({
            data
        }) => {
            console.log(data)
            this.setData({
                userInfo: data
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

    linkTo(e) {
        const nologin = e.currentTarget.dataset.nologin;
        console.log('===e.currentTarget.dataset',e.currentTarget.dataset)
        if (!nologin&&(!globalData.login.token || !globalData.login.phoneNumber)) {
            wx.navigateTo({
                url: '/pages/login/index',
            })
            return;
        }
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