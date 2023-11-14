// app.js
import {format} from "@utils/util"
import {login} from "@src/api/user";

App({
  onLaunch() {
    login();
  },
  globalData: {
    userInfo: null,
    
  }
})
