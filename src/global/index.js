export default {
  request: {
    baseUrl: "https://api.catchyrime.com",
    interval: 2 * 1000,
    maxRetries: 3,
  },
  login: {
    //用户token
    token: {
      get() {
        if (this.token) return this.token;
        const token = wx.getStorageSync("token");
        if (!token) throw Error("token is not found, check login state");

        this.token = token;
        return token;
      },

      set(val) {
        if (this.token !== val) {
          this.token = val;
          wx.setStorageSync("token", this.token);
          console.log(`token updated:`, this.token);
        }
      },
    },

    //连续登录失败次数
    failtures: {
      set(val) {
        this.failtures = val;
      },
    },
  },
};
