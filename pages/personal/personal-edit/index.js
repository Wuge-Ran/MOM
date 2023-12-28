const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

import globalData from '@src/global/index';
import {
    saveImage,
    readData
} from '@utils/fileReader'
import {
    getUserInfo,
    updateInfo,
    postAvatar
} from '@src/api/personal'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: defaultAvatarUrl,
        nicknameValue: '',
        phoneNumberValue: '',
        genders: [{
                label: '男',
                value: '男'
            },
            {
                label: '女',
                value: '女'
            },
            {
                label: '保密',
                value: '保密'
            }
        ],
        genderVisible: false,
        genderText: null,
        genderValue: '',
        boulder: [{
                label: 'V0V1',
                value: 'V0V1'
            },
            {
                label: 'V1V2',
                value: 'V1V2'
            },
            {
                label: 'V2V3',
                value: 'V2V3'
            },
            {
                label: 'V3V4',
                value: 'V3V4'
            },
            {
                label: 'V4V5',
                value: 'V4V5'
            },
            {
                label: 'V5V6',
                value: 'V5V6'
            },
            {
                label: 'V6V7',
                value: 'V6V7'
            },
            {
                label: 'V7V8',
                value: 'V7V8'
            },
            {
                label: 'V8V9',
                value: 'V8V9'
            },
            {
                label: 'V9V10',
                value: 'V9V10'
            },
        ],
        boulderVisible: false,
        boulderText: null,
        boulderValue: '',
        rock: [{
                "label": "5.6",
                "value": "5.6"
            },
            {
                "label": "5.7",
                "value": "5.7"
            },
            {
                "label": "5.8",
                "value": "5.8"
            },
            {
                "label": "5.9",
                "value": "5.9"
            },
            {
                "label": "5.10a",
                "value": "5.10a"
            },
            {
                "label": "5.10b",
                "value": "5.10b"
            },
            {
                "label": "5.10c",
                "value": "5.10c"
            },
            {
                "label": "5.10d",
                "value": "5.10d"
            },
            {
                "label": "5.11a",
                "value": "5.11a"
            },
            {
                "label": "5.11b",
                "value": "5.11b"
            },
            {
                "label": "5.11c",
                "value": "5.11c"
            },
            {
                "label": "5.11d",
                "value": "5.11d"
            },
            {
                "label": "5.12a",
                "value": "5.12a"
            },
            {
                "label": "5.12b",
                "value": "5.12b"
            },
            {
                "label": "5.12c",
                "value": "5.12c"
            },
            {
                "label": "5.12d",
                "value": "5.12d"
            },
            {
                "label": "5.13a",
                "value": "5.13a"
            },
            {
                "label": "5.13b",
                "value": "5.13b"
            },
            {
                "label": "5.13c",
                "value": "5.13c"
            },
            {
                "label": "5.13d",
                "value": "5.13d"
            },
            {
                "label": "5.14a",
                "value": "5.14a"
            },
            {
                "label": "5.14b",
                "value": "5.14b"
            },
            {
                "label": "5.14c",
                "value": "5.14c"
            },
            {
                "label": "5.14d",
                "value": "5.14d"
            },
            {
                "label": "5.15a",
                "value": "5.15a"
            },
            {
                "label": "5.15b",
                "value": "5.15b"
            },
            {
                "label": "5.15c",
                "value": "5.15c"
            },
            {
                "label": "5.15d",
                "value": "5.15d"
            }
        ],
        rockVisible: false,
        rockText: null,
        rockValue: '',
        dateValue: new Date('2000-01-01').getTime(),
        dateText: '',
        dateVisible: false,
        start: '1930-01-01 00:00:00',
        end: new Date().getTime(),
        height: [
            {
                "label": "120~129 cm",
                "value": "120~129 cm"
            },
            {
                "label": "130~139 cm",
                "value": "130~139 cm"
            },
            {
                "label": "140~149 cm",
                "value": "140~149 cm"
            },
            {
                "label": "150~159 cm",
                "value": "150~159 cm"
            },
            {
                "label": "160~169 cm",
                "value": "160~169 cm"
            },
            {
                "label": "170~179 cm",
                "value": "170~179 cm"
            },
            {
                "label": "180~189 cm",
                "value": "180~189 cm"
            },
            {
                "label": "190~199 cm",
                "value": "190~199 cm"
            },
            {
                "label": "200~209 cm",
                "value": "200~209 cm"
            },
            {
                "label": "210~219 cm",
                "value": "210~219 cm"
            },
            {
                "label": "220~229 cm",
                "value": "220~229 cm"
            }
        ],
        heightVisible: false,
        heightText: null,
        heightValue: ['160~169 cm'],
        weight: [
            {
                "label": "40~44 kg",
                "value": "40~44 kg"
            },
            {
                "label": "45~49 kg",
                "value": "45~49 kg"
            },
            {
                "label": "50~54 kg",
                "value": "50~54 kg"
            },
            {
                "label": "55~59 kg",
                "value": "55~59 kg"
            },
            {
                "label": "60~64 kg",
                "value": "60~64 kg"
            },
            {
                "label": "65~69 kg",
                "value": "65~69 kg"
            },
            {
                "label": "70~74 kg",
                "value": "70~74 kg"
            },
            {
                "label": "75~79 kg",
                "value": "75~79 kg"
            },
            {
                "label": "80~84 kg",
                "value": "80~84 kg"
            },
            {
                "label": "85~89 kg",
                "value": "85~89 kg"
            },
            {
                "label": "90~94 kg",
                "value": "90~94 kg"
            },
            {
                "label": "95~99 kg",
                "value": "95~99 kg"
            },
            {
                "label": "100~104 kg",
                "value": "100~104 kg"
            },
            {
                "label": "105~109 kg",
                "value": "105~109 kg"
            },
            {
                "label": "110~114 kg",
                "value": "110~114 kg"
            },
            {
                "label": "115~119 kg",
                "value": "115~119 kg"
            },
            {
                "label": "120~124 kg",
                "value": "120~124 kg"
            }
        ],
        weightVisible: false,
        weightValue: ['70~74 kg'],
        weightText: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            avatarUrl: globalData.avatar
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onChooseAvatar(e) {
        const {
            avatarUrl
        } = e.detail
        console.log(avatarUrl)
        
        wx.showLoading({
            title: '头像上传中',
        })
        this.base64({
            url:avatarUrl,
            type:'png'
        }).then(res=>{
            // console.log('png:',res)
            return postAvatar(res)
        }).then(res=>{
            console.log('上传成功',res)
            const url = res.data.url
            updateInfo('avatar_fileid',url)
                globalData.login.avatarId = url;
                this.setData({
                    userAvatar:url
                })
        })
    },

    base64({
        url,
        type
    }) {
        return new Promise((resolve, reject) => {
            wx.getFileSystemManager().readFile({
                filePath: url, //选择图片返回的相对路径
                encoding: 'base64', //编码格式
                success: res => {
                    resolve(res.data)
                },
                fail: res => reject(res.errMsg)
            })
        })

    },
    onBlur(e) {
        console.log(e)
        updateInfo('nickname', e.detail.value)
        this.setData({
            nicknameValue: e.detail.value
        })
    },
    onPickerTap(e) {
        const {
            key
        } = e.currentTarget.dataset;
        console.log('ww', key)
        this.setData({
            [`${key}Visible`]: true
        });
    },

    onColumnChange(e) {
        console.log('picker pick:', e);
    },

    onPickerChange(e) {
        const {
            key
        } = e.currentTarget.dataset;
        const {
            value,
            label
        } = e.detail;
        const keyMap = {
            gender: 'gender',
            boulder: 'bouldering_grade',
            rock: 'wall_grade',
            date: 'birthday',
            height: 'height',
        }
        const text = label ? label.join(' ') : value;
        console.log('picker change:', key, value, text);
        const updateValue = Array.isArray(value) ? value[0] : value
        updateInfo(keyMap[key], updateValue).then(res => {
            console.log('===updateInfo', res)
        })
        this.setData({
            [`${key}Visible`]: false,
            [`${key}Value`]: value,
            [`${key}Text`]: text,
        });
    },
    onWeightChange(e) {
        const {
            key
        } = e.currentTarget.dataset;
        const {
            value,
            label
        } = e.detail;

        console.log('onWeightChange:', e.detail);
        updateInfo('weight', value).then(res => {
            console.log('===updateInfo', res)
        })
        this.setData({
            [`${key}Visible`]: false,
            [`${key}Value`]: value,
            [`${key}Text`]: label,
        });
    },

    onPickerCancel(e) {
        const {
            key
        } = e.currentTarget.dataset;
        console.log(e, '取消');
        console.log('picker1 cancel:');
        this.setData({
            [`${key}Visible`]: false,
        });
    },
    onLogoutTap() {
        wx.clearStorageSync();
        globalData.login.phoneNumber = '';
        globalData.login.token = ''
        wx.reLaunch({
            url: '/pages/index/index'
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.updateInfo();
    },
    updateInfo() {
        getUserInfo().then(({
            data
        }) => {
            const [w1, w2] = data.weight?.split('.') ?? []
            this.setData({
                userAvatar: data.avatar_fileid,
                nicknameValue: data.nickname || '微信用户',
                genderText: data.gender,
                genderValue: [data.gender],
                phoneNumberValue: data.phone_number,
                boulderText: data.bouldering_grade,
                boulderValue: [data.bouldering_grade],
                rockText: data.wall_grade,
                rockValue: [data.wall_grade],
                dateText: data.birthday,
                dateValue: data.birthday??new Date('1995-01-01').getTime(),
                heightText: data.height && data.height,
                heightValue: data.height?[data.height]:['160~169 cm'],
                weightText: data.weight && data.weight,
                weightValue: data.weight?[data.weight]:['70~74 kg']
            })
        })


    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})