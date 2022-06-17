
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    AD: {
      type: Array,
      value: [{
        dealer_icon:"../../static/icon/car_logo/TOYOTA.jpg",
        dealer: "广州永佳丰田",
        phone: "020-34891888",
        address: "广州市番禺区大石迎宾路202号永佳丰田"
      }]

    }

  },


  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    make_phone_call(e){
      var phone = e.currentTarget.dataset.phone
      wx.makePhoneCall({
        phoneNumber: phone,
      }).then(res=>{

      }).catch(err=>{

      })
    },
    open_location(e){
      var location = e.currentTarget.dataset.loc
      console.log(location)
      wx.openLocation({
        name:"广州市永佳丰田",
        scale:15,
        latitude: 23.020813,
        longitude: 113.332138,
      })
    }

  }
})
