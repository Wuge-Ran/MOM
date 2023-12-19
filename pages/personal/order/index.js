import {
    getOrderList
} from '@src/api/personal';
import dayjs from "dayjs";

// pages/personal/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        getOrderList().then(({
            data
        }) => {

            const map = data.orders.map(item => {
                const day = item.order_created_at.replace('T', ' ');
                const newday = dayjs(day).format('YYYY-MM-DD hh:mm')
                return {
                    id: item.cardcat_id,
                    type: item.cardcat_name,
                    time: newday,
                    status: '支付成功',
                    money: item.order_paid_price.split('.')[0],
                    curClass:item.cardcat_display_bgstyle
                }
            })
            this.setData({
                orderList: map
            })
            console.log('===res', data)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})