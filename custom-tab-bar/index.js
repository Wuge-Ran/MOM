import {
  home,
  homeActive,
  course,
  courseActive,
  contracted,
  contractedActive,
  card,
  cardActive,
  personal,
  personalActive,
} from "../assets/icons/base64format";
import globalData from "@src/global/index";

Component({
  data: {
    value: "home",
    visible:true,
    // activeValue:"home",
    list: [
      {
        value: "home",
        label: "首页",
        icon: home,
        activeIcon: homeActive,
        path: "/pages/index/index",
      },
      {
        value: "course",
        label: "约课",
        icon: course,
        activeIcon: courseActive,
        path: "/pages/course/index",
      },
      {
        value: "contracted",
        label: "已约",
        icon: contracted,
        activeIcon: contractedActive,
        path: "/pages/contracted/index",
      },
      {
        value: "card",
        label: "卡类课包",
        icon: card,
        activeIcon: cardActive,
        path: "/pages/card/index",
      },
      {
        value: "personal",
        label: "我的",
        icon: personal,
        activeIcon: personalActive,
        path: "/pages/personal/index",
      },
    ],
  },

  created() {
    // for(const item of this.data.list){
    //   wx.getImageInfo({ src: item.icon });
    //   wx.getImageInfo({ src: item.activeIcon })
    // }
  },

  methods: {
    onChange(e) {
        const activeValue = e.detail.value;
        const item = this.data.list.find((item) => item.value == activeValue);
        wx.switchTab({ url: item.path, });
    },

    show() {
      this.setData({visible:true});
      const page = getCurrentPages().pop();
      const item = this.data.list.find(
        (item) => item.path === `/${page.route}`
      );
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          value: item.value,
        });
      }
    },
    hide(){
      this.setData({visible:false});
    }
  },
});
