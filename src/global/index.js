export default {
    _curBuyCard:{},
    request: {
        baseUrl: "https://api.catchyrime.com",
        interval: 2 * 1000,
        maxRetries: 3,
      
    },
    login: {
        _token: "",
        _failtures: 0,
        _phoneNumber: '',
        _avatarId: '',
        _curBuyCard:{},
        //用户token
        get token() {
            if (this._token) return this._token;
            const token = wx.getStorageSync("token");
            // if (!token) throw Error("token is not found, check login state");
            this._token = token;
            return token;
        },
        set token(val) {
            console.log("val", val);
            if (this._token !== val) {
                this._token = val;
                wx.setStorageSync("token", `${this._token}`);
                console.log(`token updated:`, this._token);
            }
        },
        //用户phoneNumber
        get phoneNumber() {
            if (this._phoneNumber) return this._phoneNumber;
            const phoneNumber = wx.getStorageSync("phoneNumber");
            // if (!token) throw Error("token is not found, check login state");
            this._phoneNumber = phoneNumber;
            return phoneNumber;
        },
        set phoneNumber(val) {
            console.log("val", val);
            if (this._phoneNumber !== val) {
                this._phoneNumber = val;
                wx.setStorageSync("phoneNumber", `${this._phoneNumber}`);
                console.log(`phoneNumber updated:`, this._phoneNumber);
            }
        },
        //连续登录失败次数
        set failtures(val) {
            this._failtures = val;
        },

        get avatarId() {
            if (this._avatarId) return this._avatarId;
            const avatarId = wx.getStorageSync("avatarId");
            // if (!token) throw Error("token is not found, check login state");
            this._avatarId = avatarId;
            return avatarId;
        },
        set avatarId(val) {
            console.log("val", val);
            if (this._avatarId !== val) {
                this._avatarId = val;
                wx.setStorageSync("avatarId", `${this._avatarId}`);
                console.log(`token updated:`, this._avatarId);
            }
        },
    },

    system: {
        _containerHeight: 0,
        get containerHeight() {
            return _containerHeight;
        }
    },

    get curBuyCard() {
        return this._curBuyCard;
    },

    set curBuyCard(val) {
        this._curBuyCard = val;
    },

    avatar: 'data:image/png;base64,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',

    userInfo: {
        _userInfo: null,
        get userInfo() {
            return this._userInfo;
        },

        set userInfo(val) {
            this._userInfo = val;
        }
    }
};