// app.js
import {login} from "./src/api/user";
App({
  onLaunch() {
    login();
  },
  globalData: {
    userInfo: null
  }
})
