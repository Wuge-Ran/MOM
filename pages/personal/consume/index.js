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
            value: dayjs().month() + 1,
            options: [{
                    "value": 1,
                    "label": "1月"
                },
                {
                    "value": 2,
                    "label": "2月"
                },
                {
                    "value": 3,
                    "label": "3月"
                },
                {
                    "value": 4,
                    "label": "4月"
                },
                {
                    "value": 5,
                    "label": "5月"
                },
                {
                    "value": 6,
                    "label": "6月"
                },
                {
                    "value": 7,
                    "label": "7月"
                },
                {
                    "value": 8,
                    "label": "8月"
                },
                {
                    "value": 9,
                    "label": "9月"
                },
                {
                    "value": 10,
                    "label": "10月"
                },
                {
                    "value": 11,
                    "label": "11月"
                },
                {
                    "value": 12,
                    "label": "12月"
                }
            ],
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
        this.getData(this.getMonthRange(month))
    },
    getMonthRange(month) {
        const year = dayjs().year(); // 当前年份
        const startOfMonth = dayjs(`${year}-${month}`).startOf('month').format('YYYY-MM-DD');
        const endOfMonth = dayjs(`${year}-${month}`).endOf('month').format('YYYY-MM-DD');
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