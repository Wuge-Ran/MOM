Component({
  behaviors: [],
  properties: {
    coachList:{
      type:Array,
      value:[],
    },
    visible:{
        type:Boolean,
        value:false
    },
  },

  data: {
   localCoachList:[{
    name:'Leo',
    id:1,
    image:"/assets/images/avatar.png",
    select:false,
    like:true
},{
  name:'Leo',
  id:2,
  image:"/assets/images/avatar.png",
  select:false
},{
  name:'Leo',
  id:3,
  image:"/assets/images/avatar.png",
  select:false
},{
  name:'Leo',
  id:4,
  image:"/assets/images/avatar.png",
  select:false
},{
  name:'Leo',
  id:5,
  image:"/assets/images/avatar.png",
  select:false
},{
  name:'Leo',
  id:6,
  image:"/assets/images/avatar.png",
  select:false
},{
  name:'Leo',
  id:7,
  image:"/assets/images/avatar.png",
  select:false
}],
  },
  computed:{
    
  },
  lifetimes: {
    created() {
     
    },
    attached() {
     
    },
    moved() {

    },
    detached() {

    },
  },

  methods: {
    onCoachClick:function (event){
        const itemData = event.currentTarget.dataset.item;
        this.setData({
            localCoachList:  this.data.localCoachList.map(item=>{
                if(item.id === itemData.id){
                    return {
                        ...item,
                        select:!item.select
                    }
                }
                return item
            })
        })
    },
    onOk:function(){
        const selected = this.data.localCoachList.filter(item=>item.select);
        console.log(selected)
        this.triggerEvent('onOk',selected)
    },
    onCancel:function(){
        const clearSelect = this.data.localCoachList.map(item=>({
            ...item,
            select: false,
        }));
        this.setData({
            localCoachList:clearSelect,
        })
        this.triggerEvent('onOk', []);
    }
  },
  observers: {
    'coachList': function(newVal) {
      this.setData({
        localCoachList: newVal.map(item=>({
            ...item,
            select:false
        }))
      });
    }
  },
});