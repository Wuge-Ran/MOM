import {
    login,
    updatePhone,
    getUserData
} from "@src/api/user";
import globalData from "../../src/global/index";
import Toast from 'tdesign-miniprogram/toast/index';

Page({
    data: {
        phoneNumber: null,
        radioStatus: false,
        privacyRadioStatus: false,
        authBtnDisabled: true,
        getPhoneBtnDisabled: true,
        showDialogConfirm: false,
        dialogConfirmBtn: {
            content: '确定',
            variant: 'base',
            disabled: true,
            'openType': 'getPhoneNumber',
            // 这是什么弱智用法
            bindgetphonenumber:({
                detail
            }) =>{
                console.log('===detail', this)
                if (detail.encryptedData && detail.iv) {
                    updatePhone(detail.encryptedData, detail.iv).then(res => {
                        console.log('===updatePhone', res)
                        return getUserData()
                    }).then(res => {
                        console.log('===getUserData', res)
                        globalData.login.phoneNumber = res.data.phone_number;
                        wx.navigateBack();
                    })
                }
            }
        },
    },
    onLoad() {
        login().then(res => {
            console.log('===login', res)
        })
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