// pages/course/index.js
import {
    getCourseByDate,
    getCourseList,
    getCoachInfo,
    likeCoach,
    disLikeCoach
} from '@src/api/course'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateList: [],
        isLike: false,
        courseList: [],
        filterCourseList:[],
        coachInfo: null,
        coachId: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('=options', options)
        const {
            id
        } = options;
        this.setData({
            coachId: id
        })
        this.getInitInfo(id)
    },

    getInitInfo(id) {
        const dateList = []
        getCoachInfo(id).then(({
            data
        }) => {
            this.setData({
                coachInfo: data,
                isLike: data.liked_by_user
            })
        })

        // this.getTabBar().show();
        getCourseByDate('group',this.data.coachId).then(({
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
            return data.today;
        }).then(curDay => {
            this.updateList(curDay)
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {


    },

    onIconTap() {
        const isLike = !this.data.isLike
        if (isLike) {
            likeCoach(this.data.coachId).then(() => {
                wx.showToast({
                    title: isLike ? '收藏成功' : '已取消收藏',
                    icon: 'none'
                })
                this.setData({
                    isLike
                })
            })
        } else {
            disLikeCoach(this.data.coachId).then(() => {
                wx.showToast({
                    title: isLike ? '收藏成功' : '已取消收藏',
                    icon: 'none'
                })
                this.setData({
                    isLike
                })
            })
        }


    },

    onTabsChange(e) {
        console.log(e.detail.value)
        // const filter = this.data.courseList.filter(item=>)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onDateChange(value) {
        this.updateList(value.detail);
    },

    updateList(curDay){
        getCourseList({
            'from-date': curDay,
            'to-date': curDay,
            'fields': "course_id,display_name,description,waiting_attenders,status,coach_id,coach_nickname,start_time,duration_minutes"
        }).then(res => {
            console.log('===getCourseList', res)
            const courseList = res.data.courses.filter(item=>item.coach_id===this.data.coachId)
            this.setData({
                courseList,
                filterCourseList:courseList
            })
        })
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