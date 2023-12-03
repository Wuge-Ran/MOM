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



    status(data) {
      let statusBtnStr="查看";
      let statusBtnClass="";
      const {status,isComplete } = data.props;
      if(status===2) {
        statusBtnStr="已签到";
        statusBtnClass="checkin";
      }
      else if(isComplete===1){
        statusBtnStr="已结束";
        statusBtnClass="completed";
      }
      
      return {statusBtnStr,statusBtnClass};
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
        console.log('===data.props',this.properties)
        const {coach_id} = this.properties.props;
      wx.navigateTo({
        url: `/pages/course/coach-detail/index?id=${coach_id}`,
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
