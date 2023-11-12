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
        const {date,index} = e.currentTarget.dataset;
        if(this.data.curIndex === index) return;
        this.setData({
            curDate:date,
            curIndex:index
        })
        this.triggerEvent('dateChange', date)
    }
  },
});
