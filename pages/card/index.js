// pages/card/index.js

import { getCards, getPrepayInfo, postBuyResult } from "@src/api/card";
const computedBehavior = require("miniprogram-computed").behavior;
import Toast from "tdesign-miniprogram/toast/index";
import globalData from "@src/global/index";
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    showPurchaseUI: false,
    // canBuy: false,
    privacyChecked: false,
    cardsByType: {},
    curCard: {},
    order: {},
    errorMsg: {
      ERR_WXPAY_CANCELLED: "超时或支付取消",
      ERR_WXPAY_FAILED: "支付失败",
      其他: "抱歉，您的网络开了小差，请稍后移步我的-会员卡页面查看",
    },
    cardsTypeTitle: {
      o4_private: "私教课程",
      o3_group: "团课课程",
      o2_bundle: "门票（Day Pass）",
      o2_time: "",
      o1_active: "特惠活动",
    },
  },
  computed: {
    canBuy(data) {
      const { for_sale_enabled: canBuy } = data.curCard || {};
      return canBuy;
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar()?.show();
    this.init();
  },

  async init() {
    const resp = await getCards();
    const cards = resp?.data?.cardcat_list || [];

    const cardsByType = this.calCardBtTypes(cards);
    this.setData({ cardsByType });
    console.log("cardsByType:", cardsByType);
  },

  calCardBtTypes(cardsOrigin) {
    const cardsByType = {};
    for (const cardOrigin of cardsOrigin) {
      //浅拷贝，并增加localType用于UI上分栏目展示
      const card = { ...cardOrigin };
      const { type, class: classic,max_consume_times,max_expire_days } = card;
      switch (type) {
        case "privatelv1":
        case "privatelv2":
          card.localType = "o4_private";
          card.bgImg = "/assets/images/private-card.png";
          break;
        case "daypass":
          card.localType = `o2_${classic}`;
          card.bgImg = "/assets/images/place-card.png";
          break;
        case "group":
          card.localType = `o3_${type}`;
          card.bgImg = "/assets/images/group-card.png";
          break;
        default:
          card.localType = type;
          break;
      }
      card.logo='/assets/images/event.png';
      card.useLimts=`${max_expire_days==='NULL'?"无限次":max_expire_days}`;
      const { localType } = card;
      if (!cardsByType[localType]) {
        cardsByType[localType] = [];
      }
      cardsByType[localType].push(card);
    }
    return cardsByType;
  },

  onCardTap(events) {
    const curCard = events?.currentTarget?.dataset?.card || {};
    console.log("onCardTap:", events, curCard);
    this.setData({ showPurchaseUI: true, curCard, privacyChecked: false });
  },

  onPrivacyTap(event) {
    const chceked = !this.data.privacyChecked;
    this.setData({ privacyChecked: chceked });
  },

  onConfromUIVisiableChange(event) {
    this.setData({ showPurchaseUI: event.detail.visible });
  },

  async onConfirmTap() {
    console.log("onConfirmTap:", this.data.curCard);
    const { id } = this.data.curCard || {};
    try {
      const resp = await getPrepayInfo(id);
      const { result, message, ...order } = resp?.data || {};
      if (result === 0) {
        console.log("order:", order);
        this.setData({ order });
        this.payment(order);
      } else {
        Toast({
          context: this,
          selector: "#t-toast",
          theme: "warning",
          direction: "column",
          message: message,
        });
      }
    } catch (error) {
      console.error(error);
      Toast({
        context: this,
        selector: "#t-toast",
        theme: "warning",
        direction: "column",
        message: "抱歉，您的网络开了小差，请稍后移步我的-会员卡页面查看",
      });
    }
  },

  payment(order) {
    const {
      wxpay_nonce_str,
      wxpay_package,
      wxpay_pay_sign,
      wxpay_sign_type,
      wxpay_timestamp,
    } = order;
    // const timeStamp = `${Math.floor(Date.now() / 1000)}`;
    const errorMsg = this.data.errorMsg;
    let payResult = false;
    wx.showLoading({ title: "", mask: true });
    wx.requestPayment({
      timeStamp: wxpay_timestamp,
      nonceStr: wxpay_nonce_str,
      package: wxpay_package,
      signType: wxpay_sign_type,
      paySign: wxpay_pay_sign,
      complete: () => {
        wx.hideLoading();
        postBuyResult(order.order_id).then(({ data }) => {
          console.log("支付查询结果", data);
          if (data.result === 0) {
            this.setData({ showPurchaseUI: false });
            //支付成功
            globalData.curBuyCard=this.data.curCard;
            wx.navigateTo({
              url: `/pages/card/success/index`,
            });
          } else {
            Toast({
              context: this,
              selector: "#t-toast",
              theme: "warning",
              direction: "column",
              message: errorMsg[data?.message || "未知"],
            });
          }
        });
      },
      success: (res) => {
        console.log("pay success", res);
      },
      fail: (err) => {
        console.error("pay fail", err);
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
