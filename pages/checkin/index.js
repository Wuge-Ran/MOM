import dayjs from "dayjs";
import {
    postScanCheckin
} from "@src/api/user";
import globalData from "../../src/global/index";

Page({
    timer:null,
    data: {
        motto: "Hello World",
        checkSuccessVisible: false,
        noMembercardVisible: false,
        checkInfo: {},
        checkInTime: 0,
        backIndexCount:3
    },
    onLoad() {
        postScanCheckin().then(({
            data
        }) => {
            if (data.cardins) {
                this.setData({
                    checkSuccessVisible: true,
                    checkInfo: data.cardins,
                    checkInTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                })
                this.timer = setInterval(()=>{
                    if(this.data.backIndexCount === 0){
                        clearInterval(this.timer);
                        this.bindBackTap();
                        return
                    }
                    this.setData({
                        backIndexCount:this.data.backIndexCount -1
                    })
                },1000)
            } else {
                this.setData({
                    noMembercardVisible: true
                })
            }
        })
    },
    onOk(){
        wx.switchTab({
            url: `/pages/card/index`,
          });
    },
    bindBackTap(){
        wx.switchTab({
            url: `/pages/index/index`,
          });
    },

    // handleGetPhoneNumber(e) {
    //     // login()
    //     console.log('=====')
    //     const {
    //         detail
    //     } = e
    //     if (detail.encryptedData && detail.iv) {
    //         updatePhone(detail.encryptedData, detail.iv).then(res => {
    //             console.log('===updatePhone', res)
    //             return getUserData()
    //         }).then(res => {
    //             console.log('===getUserData', res)
                
    //             this.setData({
    //                 phoneNumber: res.data.phone_number
    //             })
    //         })
    //     }

    //     // updatePhone(e.detail.encryptedData,e.detail.iv).then(res=>{
    //     //     console.log('===res',res)
    //     // }) 
    //     // this.login()
    // },

    handleUserProfile() {
        wx.getUserProfile({
            desc: '用户获取微信昵称和头像'
        }).then(res => {
            console.log('====getUserProfile', res)
        })
        // wx.chooseMedia()
        // wx.getClipboardData()
        // wx.startRecord()
    },

    handleGetUserInfo(e) {
        // 获取头像昵称成功
        console.log(e)
    },

    onAuth() {
        if (this.data.authBtnDisabled) {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '请先阅读并勾选协议',
                // duration:100000000,
            });
        } else {
            this.showDialog();
        }
    },
    onRadioChange() {
        const checked = !this.data.radioStatus;
        this.setData({
            "radioStatus": checked,
            "authBtnDisabled": !checked,
        });
    },

    onPrivacyRadioChange() {
        const checked = !this.data.privacyRadioStatus;
        this.setData({
            "privacyRadioStatus": checked,
            "getPhoneBtnDisabled": !checked,
            dialogConfirmBtn: {
                ...this.data.dialogConfirmBtn,
                disabled: !checked
            }
        });
    },

    showDialog() {
        this.setData({
            showDialogConfirm: true
        });
    },
    closeDialog() {
        this.setData({
            showDialogConfirm: false
        });
    },

    onDialogconfirm(e) {
        console.log('====onDialogconfirm', e)
        // 登录授权逻辑
        if (this.data.getPhoneBtnDisabled) {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '请先阅读并勾选协议',
                // duration:100000000,
            });
        } else {
            // 授权手机号
            console.log('授权手机')
            //   this.handleGetPhoneNumber()
        }
    },

    onPrivacy() {
        //打开一键登录绑定协议页面
    },
    onPhonePrivacy() {
        //打开获取手机号授权绑定协议页面
    }
})