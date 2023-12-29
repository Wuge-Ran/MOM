import globalData from "../../src/global/index";
import {
    getHomeData,
    postScanCheckin,
    getWxForReview
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
        avatarUrl: '',
        topNumber: 0,
        checkInfo: {},
        checkInTime: 0
    },
    computed: {
        timeRangeStr(data) {
            console.log("===", data);
            const {
                start_time,
                duration_minutes = 0
            } = data.userInfo.course || {};
            const s = dayjs(start_time);
            const endDate = s.add(duration_minutes, "m");
            return `${s.format("MM/DD（ddd）HH:mm")}-${endDate.format("HH:mm")}`;
        },
    },
    // 事件处理函数
    bindInfoTap() {
        wx.navigateTo({
            url: "/pages/login/index",
        });
    },
    linkToMyCard() {
        if (this.data.userInfo.available_cards) {
            wx.navigateTo({
                url: '/pages/personal/member-card/index',
            })
        } else {
            wx.switchTab({
                url: "/pages/card/index",
            });
        }
    },
    linkToCourse(e) {
        console.log('====e', e)
        const course_id = e.currentTarget.dataset.courseid;
        const url = `/pages/course/book/index?courseId=${course_id}`;
        wx.navigateTo({
            url
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
    swiperLinkTo(event) {
        let link = event.target.dataset.link
        console.log('===link', link)
        const reg = /(http|https):\/\/([\w.]+\/?)\S*/ig;
        if (link.match(reg)) {
            wx.navigateTo({
                url: '/pages/webview/index?webview=' + link,
            })
        } else {
            // 补丁，未登录且为会员卡页面则跳转到未登录的会员卡页面
            if(!globalData.login.token && link.indexOf('pages/card/index') !== -1){
                link='/pages/card-unlogin/index';
            }
            const links = ['pages/index/index','pages/course/index','pages/contracted/index','pages/card/index','pages/personal/index'];
            const isTab = links.some(item => link.indexOf(item) !== -1);
            if(isTab){
                wx.switchTab({
                  url: link,
                })
            }else{
                wx.navigateTo({
                    url: link,
                    complete:(res)=>{
                      console.log(res);
                    }
                })
            }
            
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
        console.log("===首页 onload 触发", options);
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
        if (globalData.login.phoneNumber && options.type === 'scan_checkin_daypass' && globalData.scene === 1011) {
            postScanCheckin().then(({
                data
            }) => {
                if (data.cardins) {
                    this.setData({
                        checkSuccessVisible: true,
                        checkInfo: data.cardins,
                        checkInTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        userInfo: {
                            ...this.data.userInfo,
                            'checkin_times': this.data.userInfo.checkin_times + 1
                        }
                    })
                } else {
                    this.setData({
                        noMembercardVisible: true
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
        // const {
        //     data
        // } = await getWxForReview({
        //     'miniapp-version': '1.0.0-Fj5Iw0NCHLyc6NM7ZP0tI3XhQI2gTjWR'
        // })
        // if (data.user_token) {
        //     globalData.login.phoneNumber = 'test'
        //     globalData.login.token = data.user_token;
        // }
        // console.log('===getWxForReview', globalData.login.phoneNumber)

        if (globalData.login.phoneNumber) {
            console.log('已登录')
            this.setData({
                isLogin: true,
                phoneNumber: globalData.login.phoneNumber,
                avatarUrl: globalData.avatar
            });

        } else {
            console.log('未登录')
            wx.clearStorageSync();
            globalData.login.phoneNumber = '';
            globalData.login.token = ''
            this.setData({
                isLogin: false,
            });

        }
        getHomeData().then((res) => {
            console.log("===getHomeData", res);
            setTimeout(() => {
                let query = wx.createSelectorQuery();
                query
                    .select(".userinfo")
                    .boundingClientRect((rect) => {
                        this.setData({
                            topNumber: (rect.top - 70) + 'px'
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
                    text: item.btn_text
                }
            })
            globalData.userInfo = userInfo;
            this.setData({
                userInfo,
                swiperList
            });
        }).catch(err => {
            console.warn(err)
        });
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