// pages/message-center/index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        openCourseVal:false,
        alternateOpenCourseVal:false,
        bookSuccessVal:false,
        bookWaitingVal:false,
        bookCancelVal:false,
        arrivalVal:false,
        missedVal:false,
        courseChangeVal:false,
        buyCardVal:false,
        cardExpiredVal:false,
        cardSuspendVal:false,
        couponsVal:false
    },
    handleChange(e){
        console.log('picker change:', e.detail);
        const {
            key
        } = e.currentTarget.dataset;
        const {
            value
        } = e.detail;
        this.setData({
            [`${key}Val`]: value
        });
    }
})