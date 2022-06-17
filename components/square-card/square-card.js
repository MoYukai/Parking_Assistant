// components/square-card/square-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type : String,
      value : "默认标题"
    },
    btnTitle:{
      type : String,
      value : "默认按钮"
    },
    image:{
      type : String,
      value : "../../static/icon/printer.png "
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
    goto(){
      this.triggerEvent('Btn_event')
    }

  }
})
