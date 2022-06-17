// pages/getMyQR/getMyQR.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goto4S(){
      wx.navigateTo({
        url: './map_4s/map_4s',
      })
  },
  gotoPrint(){
    wx.navigateTo({
      url: '../printQR/printQR',
    })
  },
  coding(){
    wx.showToast({
      title: '该功能正在开发中,您可以点击下方按钮进行购买',
      icon:'none'
    })
  },
  gotoBuy(){
    wx.navigateTo({
      url: '../buyQR/buyQR',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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