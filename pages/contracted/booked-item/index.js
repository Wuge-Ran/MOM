import dayjs from "dayjs";
const computedBehavior = require("miniprogram-computed").behavior;
import globalData from "@src/global/index";

Component({
  behaviors: [computedBehavior],
  properties: {
    props: {
      type: Object,
    },
  },

  data: {
    avatarUrl: "/assets/images/avatar.png",
  },

  computed: {
    timeRangeStr(data) {
      const { start_time, duration_minutes = 0 } = data.props;
      const startDate = dayjs(start_time);
      const endDate = startDate.add(duration_minutes, "m");
      return `${startDate.format("hh:mm")}-${endDate.format("hh:mm")}`;
    },

    bookStr(data) {
    },

    status(data) {
     
    },
  },

  lifetimes: {
    created() {},
    attached() {
    },
    moved() {},
    detached() {},
  },

  methods: {
    navToDetail() {
      wx.navigateTo({
        url: "/pages/course/coach-detail/index",
      });
    },
    
    onCoachTap(event) {
      this.navToDetail();
    },

    onCourseTap(event) {
      // wx.navigateTo({
      //   url: "/pages/course/book/index",
      // });
      // globalData.course.courses = this.data;
    },

    onStatusBtnTap(event) {
      wx.navigateTo({
        url: "/pages/course/book/index",
      });
      globalData.course.courses = this.data;
    },
  },
  observers: {},
});
