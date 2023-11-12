import globalData from "../../src/global/index";
import {
    getUserData
} from "@src/api/user";

// index.js
// 获取应用实例
const app = getApp();
const swiperList = [
  {
    value: `https://api.catchyrime.com/static/background.jpeg`,
    ariaLabel: '图片1',
  },
  {
    value: `https://api.catchyrime.com/static/background.jpeg`,
    ariaLabel: '图片2',
  },
  {
    value: `https://api.catchyrime.com/static/background.jpeg`,
    ariaLabel: '图片3',
  },
  {
    value: `https://api.catchyrime.com/static/background.jpeg`,
    ariaLabel: '图片4',
  },
];
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    swiperList,
    isLogin:false,
    phoneNumber:null,
    autoplay:true,
    currentIndex:0,
    checkSuccessVisible:true
  },
  // 事件处理函数
  bindInfoTap() {
    wx.navigateTo({
      url: '/pages/login/index'
    })
  },
  swpierChange(event){
    const {detail} = event;
    this.setData({
        currentIndex:detail.current
    })
  },
  oncheckSuccessTap(){
    this.setData({
        checkSuccessVisible:false
    })
  },
  onLoad() {
      console.log('===首页 onload 触发')
    if (wx.requirePrivacyAuthorize) {
        wx.requirePrivacyAuthorize({
          success: res => {
            console.log('用户同意了隐私协议 或 无需用户同意隐私协议')
            // 用户同意隐私协议后给昵称input聚焦
          },
          fail: res => {
            console.log('用户拒绝了隐私协议')
            wx.reLaunch({
                url: "/pages/index/index"
            });
          }
        })
      }
  },
  onShow(){
    this.getTabBar().show();
    console.log('===首页 onShow 触发',!!globalData.login.phoneNumber&&!!globalData.login.token);
    setTimeout(()=>{
        let query = wx.createSelectorQuery();
    query.select('.userinfo').boundingClientRect(rect=>{
    let height = rect.height;
    console.log('boundingClientRect',height);
    }).exec();
    })

    if(globalData.login.phoneNumber && globalData.login.token){
        this.setData({
            isLogin:true,
            phoneNumber:globalData.login.phoneNumber
        })
        getUserData().then(res=>{
            console.log('===getUserData',res)
            this.setData({
                userInfo:res.data
            })
        })
    }else{
        this.setData({
            isLogin:false
        })
    }
  },


})
