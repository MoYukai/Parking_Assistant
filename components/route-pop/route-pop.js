// components/route-pop/route-pop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    longitude:{
      type:Number
    },
    latitude:{
      type:Number
    },
    show:{
      type:Boolean
    },
    name:{
      type:String
    },
    address:{
      type:String
    },
    phone:{
      type:String
    },
    picture:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show : true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openLoc(){
      console.log("22")
      wx.openLocation({
        latitude : this.data.latitude,
        longitude : this.data.longitude,
        name : this.data.name,
        address : this.data.address
      })
    },
    onClose(){
      this.setData({
        show : false
      })
    },
    makePhoneCall(e){
      wx.makePhoneCall({
        phoneNumber: e.target.dataset.phone
      })
    }
  }
})
