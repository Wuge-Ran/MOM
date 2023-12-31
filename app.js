// app.js
import dayjs from "dayjs";
import locale from "@utils/dayjs/locale/zh-cn";
import globalData from "@src/global/index";

(function(){
  var PageTmp = Page;
  Page =function (pageConfig) {
    // 设置全局默认分享
    pageConfig = Object.assign({
      onShareAppMessage:function () {
        return {
          path:'pages/index/index',
        };
      },
      onShareTimeline:function () {
        return {
          title:'Mellow Climbing Gym',
          path:'pages/index/index',
        };
      },
    },pageConfig);
    PageTmp(pageConfig);
  };
})();

App({
    onLaunch(res) {

        dayjs.locale(locale, null, true);
        dayjs.locale("zh-cn");
        wx.cloud.init({
            env: 'prod-4gcinv8d026c47a7',
            traceUser: true,
        })
        

    // login();
    
    wx.onAppRoute((res) => {
      const r =this.globalData.routes;
      r.last=r.current;
      r.current=res;

      //清除course轮询，只怪微信不触发onHide和onUnload
      if( r?.last?.path=== "pages/course/index"){
        if(globalData.course.timer){
          clearInterval(globalData.course.timer);
          globalData.course.timer=undefined;
          console.log('clearCourseInterval');
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    routes:{
        last:null,
        current:null,
    }
  },
});
