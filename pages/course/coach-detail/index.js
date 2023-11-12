// pages/course/index.js
import {
    getCourseByDate
} from '@src/api/course'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateList: [],
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
        const dateList = []

        // this.getTabBar().show();
        getCourseByDate().then(({
            data
        }) => {
            let curDay = data.today;
            data.future_courses.forEach(item => {
                dateList.push({
                    date: curDay,
                    weekday: this.getDayOfWeek(curDay),
                    hasCourse: item !== 0
                })
                curDay = this.getNextDay(curDay)
            })
            console.log('=dateList', dateList)
            this.setData({
                dateList
            })
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onDateChange(value){
        console.log('====onDateChange',value.detail)
    },

    /**
     * 获取当天是周几
     */
    getDayOfWeek(dateString) {
        // 创建一个 Date 对象
        const date = new Date(dateString);
        // 获取星期几的数字，0 表示星期日，1 表示星期一，以此类推
        const dayOfWeek = date.getDay();

        // 定义星期几的字符串数组
        const daysOfWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

        // 返回星期几的字符串
        return daysOfWeek[dayOfWeek];
    },
    /**
     * 获取下一天的日期
     */
    getNextDay(dateString) {
        // 创建一个 Date 对象
        const date = new Date(dateString);

        // 获取明日的日期
        date.setDate(date.getDate() + 1);

        // 获取年、月、日
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
        const day = String(date.getDate()).padStart(2, '0'); // 补零

        // 返回明日日期的字符串
        return `${year}-${month}-${day}`;


        // 示例调用
        const inputDate = '2023-11-11';
        const nextDay = getNextDay(inputDate);
        console.log(`明日日期是 ${nextDay}`);
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