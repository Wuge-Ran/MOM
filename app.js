// app.js
import {login} from "./src/api/login";
App({
  onLaunch() {
    login();
  },
  globalData: {
    userInfo: null
  }
})
