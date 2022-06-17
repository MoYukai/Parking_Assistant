// components/shop-card/shop-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shop_image:{
      type :String,
      value : ''
    },
    shop_name:{
      type : String,
      value : '无标题'
    },
    btn_name:{
      type : String,
      value : '默认按钮'
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
    Btn(){
      this.triggerEvent('Btn_event')
    }

  }
})
