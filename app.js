// app.js
import dayjs from "dayjs";
import locale from "@utils/dayjs/locale/zh-cn";
import globalData from '@src/global/index';
import { readData } from '@utils/fileReader'

App({
    onLaunch() {
        dayjs.locale(locale, null, true);
        dayjs.locale("zh-cn");
        wx.cloud.init({
            env: 'prod-4gcinv8d026c47a7',
            traceUser: true,
        })
        //获取头像
        readData('avatar.png', 'base64').then((res) => {
            const base64 = 'data:image/png;base64,' + res;
            globalData.avatar = base64;
        })

        // login();

    },
    globalData: {
        userInfo: null,
    }
})