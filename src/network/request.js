import globalData from "../global/index";

// 服务器地址
const baseUrl = "https://api.catchyrime.com";

// 登录
export const login = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const data = { code: res.code, };
        request.post("/v1/wxuser", data, {}, /* chekLogin = */ false).then(resp=>{
            console.log("login:",resp);
            globalData.login.token=resp.user_token;
            resolve(resp);
        }).catch(err=>{
            reject(err);
        });
      },
      fail: (error) => {
        console.log(error);
        reject(error);
      },
    });
  });
};

/**
 *
 * @param {*} url  api地址
 * @param {*} options 参数
 * @returns
 */
const request = function (url, data, options = {}, chekLogin = true) {
  return new Promise((resolve, reject) => {
    const { method, token } = options;
    // 自定义的token 优先级更高
    const userToken = token || globalData.login.token;
    wx.request({
      url: `${baseUrl}${url}`,
      method,
      data,
      // header这里根据业务情况自行选择需要还是不需要
      header: {
        user_token: userToken,
      },
      success: (res) => {

        if (res.statusCode === 200) {
            resolve(res);
        }
        //假定401是没有登录或登录过期，则先登录再调用接口
        else if(res.statusCode === 401){
            if(chekLogin&& globalData.login.failtures<=globalData.request.maxRetries){
                this.login().then(()=>{
                    // 间隔一定时间并调用有限次数，防止死锁
                    globalData.login.failtures=0;
                    setTimeout(()=>{
                        request();
                    },globalData.request.interval || 2*1000);
                    
                }).catch((error)=>{
                    console.error(error);
                    globalData.login.failtures++;
                })
            }
        } 
        else {
            //  Toast(res.data.msg);
            console.warn(res);
            reject(res);
        }
      },
      fail: (err) => {
        console.error(err);
        reject(err);
      },
    });
  });
};

request.get = function (url, data, options = {}, chekLogin = true) {
  return request(url, data, { ...options, method: "GET" }, (chekLogin = true));
};

request.post = function (url, data, options = {}, chekLogin = true) {
  return request(url, data, { ...options, method: "POST" }, (chekLogin = true));
};

export default request;
