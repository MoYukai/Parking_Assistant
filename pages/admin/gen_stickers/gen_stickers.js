const model = require("./model")

// pages/admin/gen_stickers/gen_stickers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    new_info: {
    },

    history:{

    }
  },
  async del_by_recid(e) {
    wx.showLoading({
      title: '正在删除',
    })
    var recid = e.currentTarget.dataset.recid
    console.log(recid)
    var result = await model.del_stickers_by_recid(recid)
    console.log(result)
    this.onShow()
    wx.showToast({
      title: '成功删除',
      icon : 'none'
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  reset() {
    this.setData({
      new_info: {
        brand: { id: '0', name: '请选择' },
        dealer: { id: '0', name: '请选择' },
        headno: 'PA202102',
        tag: '01',
        amount: '0',
        printed:false,
        available:true
      }
    })
  },

  async confirm() {
    if(this.data.new_info.brand.id == 0 ||this.data.new_info.dealer.id == 0|| this.data.new_info.amount == 0){
      wx.showToast({
        title: '请检查输入',
        icon : "none"
      })
      return 
    }
    wx.showLoading({
      title: '正在生成中',
      mask :"true"
    })
    var res = await model.gen_stickers_db(this.data.new_info)
    console.log(res)
    if(res.errMsg ==  "cloud.callFunction:ok"){
      wx.showToast({
        title: '成功生成',
        icon:'none'
      })
    }else{
      wx.showToast({
        title: '生成失败',
        icon:'none'
      })
    }
    this.onShow()
  },
  headnoChange(e) {
    this.setData({
      'new_info.headno': e.detail
    })
  },
  amountChange(e) {
    this.setData({
      'new_info.amount': e.detail
    })
  },
  tagChange(e) {
    this.setData({
      'new_info.tag': e.detail
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reset()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow () {

    var result = await model.getHis()
    this.setData({
      history : result.data
    })
    console.log(this.data.history)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})