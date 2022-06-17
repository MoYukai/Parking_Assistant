// components/map-tab/map-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    area:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    area:"--- ---"

  },

  /**
   * 组件的方法列表
   */
  methods: {
    settler(){
      wx.showToast({
        title: '功能正在开发中，敬请期待',
        icon: 'none'
      })
    }
  }
})
