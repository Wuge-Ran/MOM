import globalData from "../../src/global/index";
import {
    getHomeData
} from "@src/api/user";
import dayjs from "dayjs";
const computedBehavior = require("miniprogram-computed").behavior;

// index.js
// 获取应用实例
const app = getApp();
const swiperList = [
  {
    value: `https://api.catchyrime.com/static/background.jpeg`,
    ariaLabel: "图片1",
  },
  {
    value: `https://api.catchyrime.com/static/background.jpeg`,
    ariaLabel: "图片2",
  },
  {
    value: `https://api.catchyrime.com/static/background.jpeg`,
    ariaLabel: "图片3",
  },
  {
    value: `https://api.catchyrime.com/static/background.jpeg`,
    ariaLabel: "图片4",
  },
];
Page({
  behaviors: [computedBehavior],
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    swiperList,
    isLogin: false,
    phoneNumber: null,
    autoplay: true,
    currentIndex: 0,
    checkSuccessVisible: false,
    noMembercardVisible: true,
  },
  computed: {
    timeRangeStr(data) {
      console.log("===");
      const { start_time, duration_minutes = 0 } = data.userInfo.course || {};
      const s = dayjs(start_time);
      const endDate = s.add(duration_minutes, "m");
      return `${s.format("MM/DD（ddd）hh:mm")}-${endDate.format("hh:mm")}`;
    },
  },
  // 事件处理函数
  bindInfoTap() {
    wx.navigateTo({
      url: "/pages/login/index",
    });
  },
  swpierChange(event) {
    const { detail } = event;
    this.setData({
      currentIndex: detail.current,
    });
  },
  oncheckSuccessTap() {
    this.setData({
      checkSuccessVisible: false,
    });
  },
  onMembercardOk() {
    this.setData({
      noMembercardVisible: false,
    });
    // TODO：跳转到购卡页面
    wx.navigateTo({
      url: "/pages/login/index",
    });
  },
  onMembercardCancel() {
    this.setData({
      noMembercardVisible: false,
    });
  },
  onLoad() {
    console.log("===首页 onload 触发");
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
      const res = wx.getSystemInfoSync()
const { screenHeight, safeArea: { bottom } } = res

if (screenHeight && bottom){
  let safeBottom = screenHeight - bottom
  console.log('resHeight',safeBottom);
  this.setData({
    height: 48 + safeBottom
  })
}
  },
  onShow() {
    this.getTabBar().show();
    console.log(
      "===首页 onShow 触发",
      !!globalData.login.phoneNumber && !!globalData.login.token
    );
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query
        .select(".userinfo")
        .boundingClientRect((rect) => {
          let height = rect.height;
          console.log("boundingClientRect", height);
        })
        .exec();
    });

    if (globalData.login.phoneNumber) {
      this.setData({
        isLogin: true,
        phoneNumber: globalData.login.phoneNumber,
      });
      getHomeData().then((res) => {
        console.log("===getHomeData", res);
        const userInfo = res.data;
        const swiperList = userInfo.background.map(item=>{
            return {
                value:item.image_url,
                link:item.link
            }
        })
        globalData.userInfo = userInfo;
        this.setData({
          userInfo,
          swiperList
        });
      });
    } else {
      this.setData({
        isLogin: false,
      });
    }
  },
  linkToCard(){
      console.log(212)
      wx.switchTab({
        url: '/pages/card/index',
      })
  }


})
