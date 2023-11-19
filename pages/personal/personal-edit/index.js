const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';


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
            [`${key}Text`]: label.join(' '),
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