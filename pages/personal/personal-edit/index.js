const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

import globalData from '@src/global/index'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: defaultAvatarUrl,
        genders: [{
                label: '男',
                value: '1'
            },
            {
                label: '女',
                value: '2'
            },
            {
                label: '保密',
                value: '3'
            }
        ],
        genderVisible: false,
        genderText: null,
        genderValue:'',
        boulder:[{
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
        },],
        boulderVisible: false,
        boulderText: null,
        boulderValue:'',
        rock:[
            {
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
        rockValue:'',
        dateValue: new Date().getTime(),
        dateText:'',
        dateVisible:false,
        start: '1930-01-01 00:00:00',
        end: new Date().getTime(),
        height:[
            {
                "label": "140 cm",
                "value": "140"
            },
            {
                "label": "141 cm",
                "value": "141"
            },
            {
                "label": "142 cm",
                "value": "142"
            },
            {
                "label": "143 cm",
                "value": "143"
            },
            {
                "label": "144 cm",
                "value": "144"
            },
            {
                "label": "145 cm",
                "value": "145"
            },
            {
                "label": "146 cm",
                "value": "146"
            },
            {
                "label": "147 cm",
                "value": "147"
            },
            {
                "label": "148 cm",
                "value": "148"
            },
            {
                "label": "149 cm",
                "value": "149"
            },
            {
                "label": "150 cm",
                "value": "150"
            },
            {
                "label": "151 cm",
                "value": "151"
            },
            {
                "label": "152 cm",
                "value": "152"
            },
            {
                "label": "153 cm",
                "value": "153"
            },
            {
                "label": "154 cm",
                "value": "154"
            },
            {
                "label": "155 cm",
                "value": "155"
            },
            {
                "label": "156 cm",
                "value": "156"
            },
            {
                "label": "157 cm",
                "value": "157"
            },
            {
                "label": "158 cm",
                "value": "158"
            },
            {
                "label": "159 cm",
                "value": "159"
            },
            {
                "label": "160 cm",
                "value": "160"
            },
            {
                "label": "161 cm",
                "value": "161"
            },
            {
                "label": "162 cm",
                "value": "162"
            },
            {
                "label": "163 cm",
                "value": "163"
            },
            {
                "label": "164 cm",
                "value": "164"
            },
            {
                "label": "165 cm",
                "value": "165"
            },
            {
                "label": "166 cm",
                "value": "166"
            },
            {
                "label": "167 cm",
                "value": "167"
            },
            {
                "label": "168 cm",
                "value": "168"
            },
            {
                "label": "169 cm",
                "value": "169"
            },
            {
                "label": "170 cm",
                "value": "170"
            },
            {
                "label": "171 cm",
                "value": "171"
            },
            {
                "label": "172 cm",
                "value": "172"
            },
            {
                "label": "173 cm",
                "value": "173"
            },
            {
                "label": "174 cm",
                "value": "174"
            },
            {
                "label": "175 cm",
                "value": "175"
            },
            {
                "label": "176 cm",
                "value": "176"
            },
            {
                "label": "177 cm",
                "value": "177"
            },
            {
                "label": "178 cm",
                "value": "178"
            },
            {
                "label": "179 cm",
                "value": "179"
            },
            {
                "label": "180 cm",
                "value": "180"
            },
            {
                "label": "181 cm",
                "value": "181"
            },
            {
                "label": "182 cm",
                "value": "182"
            },
            {
                "label": "183 cm",
                "value": "183"
            },
            {
                "label": "184 cm",
                "value": "184"
            },
            {
                "label": "185 cm",
                "value": "185"
            },
            {
                "label": "186 cm",
                "value": "186"
            },
            {
                "label": "187 cm",
                "value": "187"
            },
            {
                "label": "188 cm",
                "value": "188"
            },
            {
                "label": "189 cm",
                "value": "189"
            },
            {
                "label": "190 cm",
                "value": "190"
            },
            {
                "label": "191 cm",
                "value": "191"
            },
            {
                "label": "192 cm",
                "value": "192"
            },
            {
                "label": "193 cm",
                "value": "193"
            },
            {
                "label": "194 cm",
                "value": "194"
            },
            {
                "label": "195 cm",
                "value": "195"
            },
            {
                "label": "196 cm",
                "value": "196"
            },
            {
                "label": "197 cm",
                "value": "197"
            },
            {
                "label": "198 cm",
                "value": "198"
            },
            {
                "label": "199 cm",
                "value": "199"
            },
            {
                "label": "200 cm",
                "value": "200"
            },
            {
                "label": "201 cm",
                "value": "201"
            },
            {
                "label": "202 cm",
                "value": "202"
            },
            {
                "label": "203 cm",
                "value": "203"
            },
            {
                "label": "204 cm",
                "value": "204"
            },
            {
                "label": "205 cm",
                "value": "205"
            },
            {
                "label": "206 cm",
                "value": "206"
            },
            {
                "label": "207 cm",
                "value": "207"
            },
            {
                "label": "208 cm",
                "value": "208"
            },
            {
                "label": "209 cm",
                "value": "209"
            },
            {
                "label": "210 cm",
                "value": "210"
            },
            {
                "label": "211 cm",
                "value": "211"
            },
            {
                "label": "212 cm",
                "value": "212"
            },
            {
                "label": "213 cm",
                "value": "213"
            },
            {
                "label": "214 cm",
                "value": "214"
            },
            {
                "label": "215 cm",
                "value": "215"
            },
            {
                "label": "216 cm",
                "value": "216"
            },
            {
                "label": "217 cm",
                "value": "217"
            },
            {
                "label": "218 cm",
                "value": "218"
            },
            {
                "label": "219 cm",
                "value": "219"
            },
            {
                "label": "220 cm",
                "value": "220"
            },
            {
                "label": "221 cm",
                "value": "221"
            },
            {
                "label": "222 cm",
                "value": "222"
            },
            {
                "label": "223 cm",
                "value": "223"
            },
            {
                "label": "224 cm",
                "value": "224"
            },
            {
                "label": "225 cm",
                "value": "225"
            },
            {
                "label": "226 cm",
                "value": "226"
            },
            {
                "label": "227 cm",
                "value": "227"
            },
            {
                "label": "228 cm",
                "value": "228"
            },
            {
                "label": "229 cm",
                "value": "229"
            },
            {
                "label": "230 cm",
                "value": "230"
            }
        ],
        heightVisible: false,
        heightText: null,
        heightValue:['180'],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onChooseAvatar(e) {
        const {
            avatarUrl
        } = e.detail
        this.setData({
            avatarUrl,
        })
    },
    onPickerTap(e) {
        const {
            key
        } = e.currentTarget.dataset;
        console.log('ww',key)
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
            value,label
        } = e.detail;

        console.log('picker change:', key);
        this.setData({
            [`${key}Visible`]: false,
            [`${key}Value`]: value,
            [`${key}Text`]: label?label.join(' '):value,
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
    onLogoutTap(){
        wx.clearStorageSync();
        globalData.login.phoneNumber = ''
        wx.reLaunch({
            url: '/pages/index/index'
          })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // this.getTabBar().show();
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