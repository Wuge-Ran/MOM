const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

import globalData from '@src/global/index'
import {getUserInfo,updateInfo} from '@src/api/personal'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: defaultAvatarUrl,
        nicknameValue:'',
        phoneNumberValue:'',
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
        weightOne:[
            {
                "label": "40",
                "value": "40"
            },
            {
                "label": "41",
                "value": "41"
            },
            {
                "label": "42",
                "value": "42"
            },
            {
                "label": "43",
                "value": "43"
            },
            {
                "label": "44",
                "value": "44"
            },
            {
                "label": "45",
                "value": "45"
            },
            {
                "label": "46",
                "value": "46"
            },
            {
                "label": "47",
                "value": "47"
            },
            {
                "label": "48",
                "value": "48"
            },
            {
                "label": "49",
                "value": "49"
            },
            {
                "label": "50",
                "value": "50"
            },
            {
                "label": "51",
                "value": "51"
            },
            {
                "label": "52",
                "value": "52"
            },
            {
                "label": "53",
                "value": "53"
            },
            {
                "label": "54",
                "value": "54"
            },
            {
                "label": "55",
                "value": "55"
            },
            {
                "label": "56",
                "value": "56"
            },
            {
                "label": "57",
                "value": "57"
            },
            {
                "label": "58",
                "value": "58"
            },
            {
                "label": "59",
                "value": "59"
            },
            {
                "label": "60",
                "value": "60"
            },
            {
                "label": "61",
                "value": "61"
            },
            {
                "label": "62",
                "value": "62"
            },
            {
                "label": "63",
                "value": "63"
            },
            {
                "label": "64",
                "value": "64"
            },
            {
                "label": "65",
                "value": "65"
            },
            {
                "label": "66",
                "value": "66"
            },
            {
                "label": "67",
                "value": "67"
            },
            {
                "label": "68",
                "value": "68"
            },
            {
                "label": "69",
                "value": "69"
            },
            {
                "label": "70",
                "value": "70"
            },
            {
                "label": "71",
                "value": "71"
            },
            {
                "label": "72",
                "value": "72"
            },
            {
                "label": "73",
                "value": "73"
            },
            {
                "label": "74",
                "value": "74"
            },
            {
                "label": "75",
                "value": "75"
            },
            {
                "label": "76",
                "value": "76"
            },
            {
                "label": "77",
                "value": "77"
            },
            {
                "label": "78",
                "value": "78"
            },
            {
                "label": "79",
                "value": "79"
            },
            {
                "label": "80",
                "value": "80"
            },
            {
                "label": "81",
                "value": "81"
            },
            {
                "label": "82",
                "value": "82"
            },
            {
                "label": "83",
                "value": "83"
            },
            {
                "label": "84",
                "value": "84"
            },
            {
                "label": "85",
                "value": "85"
            },
            {
                "label": "86",
                "value": "86"
            },
            {
                "label": "87",
                "value": "87"
            },
            {
                "label": "88",
                "value": "88"
            },
            {
                "label": "89",
                "value": "89"
            },
            {
                "label": "90",
                "value": "90"
            },
            {
                "label": "91",
                "value": "91"
            },
            {
                "label": "92",
                "value": "92"
            },
            {
                "label": "93",
                "value": "93"
            },
            {
                "label": "94",
                "value": "94"
            },
            {
                "label": "95",
                "value": "95"
            },
            {
                "label": "96",
                "value": "96"
            },
            {
                "label": "97",
                "value": "97"
            },
            {
                "label": "98",
                "value": "98"
            },
            {
                "label": "99",
                "value": "99"
            },
            {
                "label": "100",
                "value": "100"
            },
            {
                "label": "101",
                "value": "101"
            },
            {
                "label": "102",
                "value": "102"
            },
            {
                "label": "103",
                "value": "103"
            },
            {
                "label": "104",
                "value": "104"
            },
            {
                "label": "105",
                "value": "105"
            },
            {
                "label": "106",
                "value": "106"
            },
            {
                "label": "107",
                "value": "107"
            },
            {
                "label": "108",
                "value": "108"
            },
            {
                "label": "109",
                "value": "109"
            },
            {
                "label": "110",
                "value": "110"
            },
            {
                "label": "111",
                "value": "111"
            },
            {
                "label": "112",
                "value": "112"
            },
            {
                "label": "113",
                "value": "113"
            },
            {
                "label": "114",
                "value": "114"
            },
            {
                "label": "115",
                "value": "115"
            },
            {
                "label": "116",
                "value": "116"
            },
            {
                "label": "117",
                "value": "117"
            },
            {
                "label": "118",
                "value": "118"
            },
            {
                "label": "119",
                "value": "119"
            },
            {
                "label": "120",
                "value": "120"
            },
            {
                "label": "121",
                "value": "121"
            },
            {
                "label": "122",
                "value": "122"
            },
            {
                "label": "123",
                "value": "123"
            },
            {
                "label": "124",
                "value": "124"
            },
            {
                "label": "125",
                "value": "125"
            },
            {
                "label": "126",
                "value": "126"
            },
            {
                "label": "127",
                "value": "127"
            },
            {
                "label": "128",
                "value": "128"
            },
            {
                "label": "129",
                "value": "129"
            },
            {
                "label": "130",
                "value": "130"
            },
            {
                "label": "131",
                "value": "131"
            },
            {
                "label": "132",
                "value": "132"
            },
            {
                "label": "133",
                "value": "133"
            },
            {
                "label": "134",
                "value": "134"
            },
            {
                "label": "135",
                "value": "135"
            },
            {
                "label": "136",
                "value": "136"
            },
            {
                "label": "137",
                "value": "137"
            },
            {
                "label": "138",
                "value": "138"
            },
            {
                "label": "139",
                "value": "139"
            },
            {
                "label": "140",
                "value": "140"
            },
            {
                "label": "141",
                "value": "141"
            },
            {
                "label": "142",
                "value": "142"
            },
            {
                "label": "143",
                "value": "143"
            },
            {
                "label": "144",
                "value": "144"
            },
            {
                "label": "145",
                "value": "145"
            },
            {
                "label": "146",
                "value": "146"
            },
            {
                "label": "147",
                "value": "147"
            },
            {
                "label": "148",
                "value": "148"
            },
            {
                "label": "149",
                "value": "149"
            },
            {
                "label": "150",
                "value": "150"
            }
        ],
        weightTwo:[
            {
                "label": "0",
                "value": "0"
            },
            {
                "label": "1",
                "value": "1"
            },
            {
                "label": "2",
                "value": "2"
            },
            {
                "label": "3",
                "value": "3"
            },
            {
                "label": "4",
                "value": "4"
            },
            {
                "label": "5",
                "value": "5"
            },
            {
                "label": "6",
                "value": "6"
            },
            {
                "label": "7",
                "value": "7"
            },
            {
                "label": "8",
                "value": "8"
            },
            {
                "label": "9",
                "value": "9"
            }
        ],
        weightVisible:false,
        weightValue:[],
        weightText: null,
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
    onBlur(e){
        console.log(e)
        updateInfo('nickname',e.detail.value).then(res=>{

        })
        this.setData({
            nicknameValue:e.detail.value
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
        const keyMap = {
            gender:'gender',
            boulder:'bouldering_grade',
            rock:'wall_grade',
            date:'birthday',
            height:'height',
        }
        const text = label?label.join(' '):value;
        console.log('picker change:',key, value,text);
        const updateValue = Array.isArray(value) ?value[0]:value
        updateInfo(keyMap[key],updateValue).then(res=>{
            console.log('===updateInfo',res)
        })
        this.setData({
            [`${key}Visible`]: false,
            [`${key}Value`]: value,
            [`${key}Text`]: text,
        });
    },
    onWeightChange(e){
        const {
            key
        } = e.currentTarget.dataset;
        const {
            value,label
        } = e.detail;

        console.log('onWeightChange:', e.detail);
        const updateValue = `${value[0]}.${value[1]}`
        updateInfo('weight',updateValue).then(res=>{
            console.log('===updateInfo',res)
        })
        this.setData({
            [`${key}Visible`]: false,
            [`${key}Value`]: value,
            [`${key}Text`]: label[0]+'.'+label[1]+'kg',
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
        this.updateInfo();
    },
    updateInfo(){
        getUserInfo().then(({data})=>{
            console.log('==data',data);
            const [w1,w2] = data.weight.split('.')
            this.setData({
                nicknameValue:data.nickname,
                genderText:data.gender,
                genderValue:[data.gender],
                phoneNumberValue:data.phone_number,
                boulderText:data.bouldering_grade,
                boulderValue:[data.bouldering_grade],
                rockText:data.wall_grade,
                rockValue:[data.wall_grade],
                dateText:data.birthday,
                dateValue:data.birthday,
                heightText:data.height&&data.height+' cm',
                heightValue:[data.height],
                weightText:data.weight&&data.weight+' kg',
                weightValue:[w1,w2]
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