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
    selectDetail:{
        type: String,
        value:''
    }
  },

  data: {
   localCoachList:[{
    name:'Leo',
    id:1,
    image:"/assets/images/avatar.png",
    like:true
},{
  name:'Leo',
  id:2,
  image:"/assets/images/avatar.png"
},{
  name:'Leo',
  id:3,
  image:"/assets/images/avatar.png"
},{
  name:'Leo',
  id:4,
  image:"/assets/images/avatar.png"
},{
  name:'MESSI',
  id:5,
  image:"/assets/images/avatar.png"
},{
  name:'DEFDWEFFED',
  id:6,
  image:"/assets/images/avatar.png"
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
    },
    onClose:function(){
        this.setData({
            visible:false
        })
    }
  },
  observers: {
    'coachList': function(newVal) {
        console.log(this.data.selectDetail,'2222');
        const selectDetailArr = this.data.selectDetail.split('，')||[];
        console.log(selectDetailArr,'selectDetailArr',newVal);
        this.setData({
            localCoachList: newVal.map(item=>{
                console.log(selectDetailArr.includes(item.name));
                return {
                    ...item,
                    select:selectDetailArr.includes(item.name)
                }
            })
        });
    }
  },
});