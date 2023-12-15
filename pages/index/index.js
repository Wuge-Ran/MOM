import globalData from "../../src/global/index";
import {
    getHomeData,
    postScanCheckin
} from "@src/api/user";
import dayjs from "dayjs";
const computedBehavior = require("miniprogram-computed").behavior;

// index.js
// 获取应用实例
const app = getApp();
const swiperList = [];
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
        noMembercardVisible: false,
        avatarUrl:'',
        topNumber:0,
        checkInfo:{},
        checkInTime:0
    },
    computed: {
        timeRangeStr(data) {
            console.log("===",data);
            const {
                start_time,
                duration_minutes = 0
            } = data.userInfo.course || {};
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
        const {
            detail
        } = event;
        this.setData({
            currentIndex: detail.current,
        });
    },
    swiperLinkTo(event){
        const link = event.target.dataset.link
        console.log('===link',link)
        const reg = /(http|https):\/\/([\w.]+\/?)\S*/ig;
        if(link.match(reg)){
            wx.navigateTo({
                url: '/pages/webview/index?webview='+link,
                })
          }else{
            wx.navigateTo({
                url: link,
              })
          }
        
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
        wx.switchTab({
            url: "/pages/card/index",
        });
    },
    onMembercardCancel() {
        this.setData({
            noMembercardVisible: false,
        });
    },
    onLoad(options) {
        console.log("===首页 onload 触发",options);
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
        // 说明已经登录
        if (globalData.login.phoneNumber && options.type ==='scan_checkin_daypass'){
            postScanCheckin().then(({data})=>{
                if(data.cardins){
                    this.setData({
                        checkSuccessVisible:true,
                        checkInfo:data.cardins,
                        checkInTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
                    })
                }else{
                    this.setData({
                        noMembercardVisible:true
                    })
                }
            })
        }
        const res = wx.getSystemInfoSync()
        const {
            screenHeight,
            safeArea: {
                bottom
            }
        } = res
        
        if (screenHeight && bottom) {
            let safeBottom = screenHeight - bottom
            console.log('resHeight', safeBottom);
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
        

        if (globalData.login.phoneNumber) {
            this.setData({
                isLogin: true,
                phoneNumber: globalData.login.phoneNumber,
                avatarUrl:globalData.avatar
            });
            getHomeData().then((res) => {
                console.log("===getHomeData", res);
                setTimeout(() => {
                    let query = wx.createSelectorQuery();
                    query
                        .select(".userinfo")
                        .boundingClientRect((rect) => {
                            this.setData({
                                topNumber:(rect.top - 70) +'px'
                            })
                            console.log("boundingClientRect", rect);
                        })
                        .exec();
                });
                const userInfo = res.data;
                const swiperList = userInfo.background.map(item => {
                    return {
                        value: item.image_url,
                        link: item.link,
                        text:item.btn_text
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
    linkToCard() {
        console.log(212)
        this.setData({
            noMembercardVisible: false
        })
        wx.switchTab({
            url: '/pages/card/index',
        })
    }


})