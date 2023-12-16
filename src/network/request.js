import globalData from "../global/index";
import {
    login
} from "../api/user";

/**
 *
 * @param {*} url  api地址
 * @param {*} options 参数
 * @returns
 */
const request = function (url, data, options = {}, showLoading = true, chekLogin = true) {
    return new Promise((resolve, reject) => {
        const {
            method,
            token,
            header
        } = options;
        // 自定义的token 优先级更高
        const userToken = token || globalData.login.token;
        console.log('====',url)
        // if (showLoading) wx.showLoading({
        //     title: "",
        //     mask: true
        // }); //接口请loading...
        wx.cloud.callContainer({
            path: url,
            method,
            // header这里根据业务情况自行选择需要还是不需要
            header: {
                ...header,
                ...data,
                "user-token": userToken,
                "wxuser-token": userToken,
                "X-WX-SERVICE": "mellow",
    "content-type": "application/json",
            },
            success: (res) => {
                if (showLoading) wx.hideLoading(); //关闭loading
                if (res.statusCode === 200) {
                    resolve(res);
                }
                //假定401是没有登录或登录过期，则先登录再调用接口
                else if (res.statusCode === 401) {
                    if (
                        chekLogin &&
                        globalData.login.failtures <= globalData.request.maxRetries
                    ) {
                        login()
                            .then(() => {
                                // 间隔一定时间并调用有限次数，防止死锁
                                globalData.login.failtures = 0;
                                setTimeout(() => {
                                    request();
                                }, globalData.request.interval || 2 * 1000);
                            })
                            .catch((error) => {
                                console.error(error);
                                globalData.login.failtures++;
                            });
                    }
                } else {
                    //  Toast(res.data.msg);
                    console.warn(res);
                    reject(res);
                }
            },
            fail: (err) => {
                if (showLoading) wx.hideLoading(); //关闭loading
                console.error("fail:", err);
                wx.showToast({
                    title: "网络异常",
                    icon: "error",
                });
                reject(err);
            },
        });
    });
};

request.get = function (url, data, options = {},showLoading = true, chekLogin = true) {
    return request(url, data, {
        ...options,
        method: "GET"
    },(showLoading), (chekLogin = true));
};

request.post = function (url, data, options = {},showLoading = true, chekLogin = true) {
    return request(url, data, {
        ...options,
        method: "POST"
    },(showLoading), (chekLogin = true));
};
request.delete = function (url, data, options = {},showLoading = true, chekLogin = true) {
    return request(
        url,
        data, {
            ...options,
            method: "DELETE"
        },
        (showLoading),
        (chekLogin = true)
    );
};

export default request;