import {
    getCurrentCard
} from "@src/api/personal";

Page({
    data: {
        banner: [{
                id: 0,
                url: './img/card-1.png'
            },
            {
                id: 1,
                url: './img/card-2.png'
            },
            {
                id: 2,
                url: './img/card-1.png'
            }
        ],
        swiperMargin: '150rpx',
        swiperCurrent: 0,
        swiperList: [],
        cardinsList:[]
    },
    onShow(){
        getCurrentCard().then(({data})=>{
            console.log('getCurrentCard:',data)
            this.setData({
                cardinsList:data.cardins_list
            })
        })
    },
    // 监听swiper切换
    swiperChange(e) {
        let current = e.detail.current;
        this.setData({
            swiperCurrent: current
        });
    },
    handleChange(e) {
        console.log(e.detail.value)
    }
})