// app.js
import dayjs from "dayjs";
import locale from "@utils/dayjs/locale/zh-cn";
import globalData from '@src/global/index';

App({
    onLaunch(res) {
        console.log(res)
        globalData.scene = res.scene;
        dayjs.locale(locale, null, true);
        dayjs.locale("zh-cn");
        wx.cloud.init({
            env: 'prod-4gcinv8d026c47a7',
            traceUser: true,
        })
        //获取头像

        // login();

    },
    globalData: {
        userInfo: null,
    }
})