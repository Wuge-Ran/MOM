Component({
  data: {
    value: "home",
    list: [
      {
        value: "home",
        label: "首页",
        icon: "/assets/icons/home.png",
        activeIcon: "/assets/icons/home.png",
        path: "/pages/index/index",
      },
      {
        value: "course",
        label: "约课",
        icon: "/assets/icons/course.png",
        activeIcon: "/assets/icons/course.png",
        path: "/pages/course/index",
      },
      {
        value: "contracted",
        label: "已约",
        icon: "/assets/icons/contracted.png",
        activeIcon: "/assets/icons/contracted.png",
        path: "/pages/contracted/index",
      },
      {
        value: "card",
        label: "会员卡",
        icon: "/assets/icons/card.png",
        activeIcon: "/assets/icons/card.png",
        path: "/pages/card/index",
      },
      {
        value: "personal",
        label: "我的",
        icon: "/assets/icons/personal.png",
        activeIcon: "/assets/icons/personal.png",
        path: "/pages/course/index",
      },
    ],
  },

  methods: {
    onChange(e) {
      const activeValue = e.detail.value;
      const item = this.data.list.find((item) => item.value == activeValue);
      this.setData({
        value: e.detail.value,
      });
      wx.switchTab({
        url: item.path,
      });
    },
  },
});
