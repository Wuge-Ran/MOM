// index.js
// 获取应用实例
const app = getApp()
const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images';
const swiperList = [
  {
    value: `${imageCdn}/swiper1.png`,
    ariaLabel: '图片1',
  },
  {
    value: `${imageCdn}/swiper2.png`,
    ariaLabel: '图片2',
  },
  {
    value: `${imageCdn}/swiper1.png`,
    ariaLabel: '图片1',
  },
  {
    value: `${imageCdn}/swiper2.png`,
    ariaLabel: '图片2',
  },
];
import {updatePhone} from "../../src/api/user";
Page({
    
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    swiperList
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  login(){
    wx.login({
        success(res){
            console.log('====res',res)
        }
    })
    this.getUserProfile()
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    console.log(121)
  },
  getPhoneNumber (e) {
    console.log(e.detail) 
    updatePhone(e.detail.encryptedData,e.detail.iv).then(res=>{
        console.log('===res',res)
    }) 
    // this.login()
  }
})
