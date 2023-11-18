import dayjs from "dayjs";
const computedBehavior = require("miniprogram-computed").behavior;
// import globalData from "@src/global/index";

Component({
  behaviors: [computedBehavior],
  properties: {
    props: {
      type: Object,
    },
  },

  data: {
    expired: true,
    canBook: false,
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
      return `${data.props.current_attenders}/${data.props.max_attenders}`;
    },

    status(data) {
      const { status } = data.props;
      let statusInfo = { btnStr: "", icon: "" };
      if (data.expired) {
        statusInfo.btnStr = "已截止";
      } else if (data.canBook) {
        statusInfo.btnStr = "预约";
        if (status > 0) statusInfo.icon = "/assets/images/booked.png";
      } else {
        statusInfo.btnStr = "候补";
        if (status < 0) statusInfo.icon = "/assets/images/queuing.png";
      }
      // console.log("statusInfo", data, statusInfo);
      return statusInfo;
    },
  },

  lifetimes: {
    created() {},
    attached() {
      const expired = this.calcExpired();
      const canBook = this.calcCanBook();
      this.setData({ ...this.data, expired, canBook });
    },
    moved() {},
    detached() {},
  },

  methods: {
    // 是否已截止
    calcExpired() {
      const { start_time } = this.data.props;
      const startDate = dayjs(start_time);
      // console.log("calcExpired", dayjs().isBefore(startDate));
      return startDate.isBefore(dayjs());
    },
    navToDetail(id) {
      wx.navigateTo({
        url: "/pages/course/coach-detail/index?"+"id="+id,
      });
    },
    // 是否可以预定
    calcCanBook() {
      const { current_attenders = 0, max_attenders = 0 } = this.data.props;
      // console.log("calcCanBook", current_attenders < max_attenders);
      return current_attenders < max_attenders;
    },

    onCoachTap(event) {
      this.navToDetail(event.currentTarget.dataset.id);
    },

    onCourseTap(event) {
      this.navToCourseDetail();
      // globalData.course.courses = this.data;
    },

    navToCourseDetail(showPurchaseUI=false){
      const {course_id} =this.data.props;
      const url=`/pages/course/book/index?courseId=${course_id}&showPurchaseUI=${showPurchaseUI}`;
      wx.redirectTo({ url });
    },

    onStatusBtnTap(event) {
      this.navToCourseDetail(true);
    },
  },
  observers: {},
});
