import request  from "../network/request";
import globalData from "../global/index";
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
              globalData.login.token=resp.data.user_token;
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

  export const updatePhone =(encryptedData,iv)=>{
    const url =`/v1/wxuser/${globalData.login.token}/phone`;
    const data = {encrypted_data:encryptedData,iv};
    return request.post(url,data)
  }
