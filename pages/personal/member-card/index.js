import {
    getCurrentCard
} from "@src/api/personal";
import dayjs from "dayjs";

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
            console.log('getCurrentCard:',data.cardins_list)
            const cardinsList = data.cardins_list.map(item=>{
                let bgImg;
                let unit;
                let excess;
                if(item.cardcat_type === 'daypass'){
                    if(item.cardins_expire_date === null){
                        excess='无限天数'
                        unit = ''
                        return;
                    }
                    if(item.cardcat_class === 'time'){
                        unit = '天剩余'
                        excess = dayjs(item.cardins_expire_date).diff(dayjs().format('YYYY-MM-DD'),'day')
                    }else{
                        unit = '次剩余'
                        excess = item.cardins_max_consume_times - item.cardins_consume_times
                    }
                } else {
                    excess = item.cardins_max_consume_times - item.cardins_consume_times
                    unit = '节剩余'
                }
                switch (item.cardcat_display_bgstyle) {
                    case "pink":
                      bgImg = "/assets/images/private-card.png";
                      break;
                    case "brown":
                        bgImg = "/assets/images/month-card.png";
                      break;
                    case "lightgreen":
                        bgImg = "/assets/images/place-card.png";
                      break;
                    case "deepgreen":
                        bgImg = "/assets/images/group-card.png";
                      break;
                  }
                return {
                    ...item,
                    imgUrl:bgImg,
                    unit,
                    excess
                }
            }).filter(item=>{
                return item.cardins_status === 'inactive'|| item.cardins_status === 'active'
            })
            console.log('===cardinsList',cardinsList)
            this.setData({
                cardinsList
            })
        })
    },
    toLink(){
        wx.navigateTo({
          url: '/pages/personal/consume/index',
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