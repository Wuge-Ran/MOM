// pages/personal/index.js
import dayjs from "dayjs";
import {
    getCheckinList,
    getCouresCardList
} from "@src/api/personal";
Page({
    id: null,
    type: null,
    /**
     * 页面的初始数据
     */
    data: {
        orderList: [],
        product: {
            value: '2023-12',
            options: [],
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('===options', options)
        this.type = options.type;
        this.id = options.id;
        // if()
        const month = dayjs().month() + 1;
        const year = dayjs().year() ;
        // 获取当前月份
        const list = []
        const curTime = `${year}-${month}`
        // 输出之前一年的月份和年份
        for (let i = 0; i < 12; i++) {
            const month = dayjs().subtract(i, 'month').format('MM');
            const year = dayjs().subtract(i, 'month').format('YYYY');
            console.log(`${year}年${month}月`);
            list.push({
                "value": `${year}-${month}`,
                "label": `${year}年${month}月`
            })
        }
        this.setData({
            'product.value': curTime,
            'product.options': list,
        });
        this.getData(this.getMonthRange(curTime))
    },
    getMonthRange(curTime) {
        const startOfMonth = dayjs(curTime).startOf('month').format('YYYY-MM-DD');
        const endOfMonth = dayjs(curTime).endOf('month').format('YYYY-MM-DD');
        return [startOfMonth, endOfMonth];
    },
    getData(date) {
        const parmas = {
            'from-date': date[0],
            'to-date': date[1],
            'cardins-id': this.id
        }
        if (this.type === 'daypass') {
            getCheckinList(parmas).then(({
                data
            }) => {
                console.log('====date', data);
                const list = data.checkin_daypass_list.map(item => {
                    return {
                        title: item.cardcat_name,
                        time: dayjs(item.checkin_time).format('YYYY-MM-DD HH:mm'),
                        person: `签到${item.checkin_persons}次`
                    }
                })
                this.setData({
                    orderList: list
                })
            })
        } else {
            getCouresCardList(parmas).then(({
                data
            }) => {
                console.log('====date', data);
                const obj = {
                    reserved: '预约1次',
                    waiting: '候补1次',
                    checkedin: '签到1次',
                    noshow: '缺席1次'
                }

                const list = data.courses.map(item => {
                    const personText = obj[item.attend_status] ?? '使用1次';
                    return {
                        title: item.course_display_name,
                        time: dayjs(item.course_start_time).format('YYYY-MM-DD HH:mm'),
                        person: personText
                    }
                })
                this.setData({
                    orderList: list
                })
            })
        }

    },
    onMouthChange(e) {
        this.setData({
            'product.value': e.detail.value,
        });
        this.getData(this.getMonthRange(e.detail.value))
        console.log(this.getMonthRange(e.detail.value));
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