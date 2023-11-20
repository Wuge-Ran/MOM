// app.js
import {format} from "@utils/util"
import {login} from "@src/api/user";
import dayjs from "dayjs";
import locale from "@utils/dayjs/locale/zh-cn";

App({
  onLaunch() {
    dayjs.locale(locale, null, true);
    dayjs.locale("zh-cn");
    // login();
    
  },
  globalData: {
    userInfo: null,
  }
})
