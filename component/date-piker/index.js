Component({
    properties:{
        list:{
            type:Array,
            value:[]
        }
    },
  data: {
        curIndex:0,
        curDate:''
  },

  methods: {
    onDateClick(e){
        console.log('====e',e)
        const {date,index} = e.currentTarget.dataset;
        this.setData({
            curDate:date,
            curIndex:index
        })
        this.triggerEvent('dateChange', date)
    }
  },
});
