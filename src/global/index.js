export default {
  request: {
    baseUrl: "https://api.catchyrime.com",
    interval: 2 * 1000,
    maxRetries: 3,
  },
  login: {
    _token:"",
    _failtures:0,
    _phoneNumber:'',
    //用户token
    get token(){
        if (this._token) return this._token;
        const token = wx.getStorageSync("token");
        // if (!token) throw Error("token is not found, check login state");
        this._token = token;
        return token;
      },
    set token(val) {
          console.log("val",val);
        if (this._token !== val) {
          this._token = val;
          wx.setStorageSync("token", `${this._token}`);
          console.log(`token updated:`, this._token);
        }
      },
    //用户token
    get phoneNumber(){
        if (this._phoneNumber) return this._phoneNumber;
        const phoneNumber = wx.getStorageSync("phoneNumber");
        // if (!token) throw Error("token is not found, check login state");
        this._phoneNumber = phoneNumber;
        return phoneNumber;
      },
    set phoneNumber(val) {
          console.log("val",val);
        if (this._phoneNumber !== val) {
          this._phoneNumber = val;
          wx.setStorageSync("phoneNumber", `${this._phoneNumber}`);
          console.log(`phoneNumber updated:`, this._phoneNumber);
        }
      },  
    //连续登录失败次数
    set failtures(val)  {
        this._failtures = val;
      },
  },

  system:{
    _containerHeight: 0,
    get containerHeight(){
      return _containerHeight;
    }
  }
};
