// app.js
import request,{login} from "./src/network/request";
App({
  onLaunch() {
    login();
  },
  globalData: {
    userInfo: null
  }
})
