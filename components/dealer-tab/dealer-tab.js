// components/dealer-tab/dealer-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ids:{
      type:String
    },
    name:{
      type:String
    },
    address:{
      type:String
    },
    distance:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ids:0,
    name: "4s店名称",
    address: "区域-具体地址…",
    distance: "5.5km"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select(e){
      this.triggerEvent('select',{id : e.currentTarget.dataset.id})
    },
    openLoc(e){
      this.triggerEvent('openLoc',{id : e.currentTarget.dataset.id})
    }
  }
})
