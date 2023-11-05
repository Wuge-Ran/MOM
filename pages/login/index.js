import {
    login,
    updatePhone,
    getUserData
} from "../../src/api/user";

Page({
    data: {
        phoneNumber:null
    },
    onLoad() {
        login().then(res => {
            console.log('===login', res)
        })
    },
    handleGetPhoneNumber(e) {
        const {
            detail
        } = e
        if (detail.encryptedData && detail.iv) {
            updatePhone(detail.encryptedData, detail.iv).then(res => {
                console.log('===updatePhone', res)
                return getUserData()
            }).then(res=>{
                console.log('===getUserData', res)
                this.setData({
                    phoneNumber:res.data.phone_number
                })
            })
        }

        // updatePhone(e.detail.encryptedData,e.detail.iv).then(res=>{
        //     console.log('===res',res)
        // }) 
        // this.login()
    },
    handleUserProfile() {
        wx.getUserProfile({
            desc:'用户获取微信昵称和头像'
        }).then(res=>{
            console.log('====getUserProfile',res)
        })
        // wx.chooseMedia()
        // wx.getClipboardData()
        // wx.startRecord()
      },
      handleGetUserInfo(e) {
        // 获取头像昵称成功
        console.log(e)
      }  
})