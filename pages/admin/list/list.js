const model = require('./model')
const db = require('../../../common_db/database')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {
    }

  },
  getValue(e) {
    var detail = e.target.dataset.detail
    console.log(detail)
    let pages = getCurrentPages(); // 当前页，
    let prevPage = pages[pages.length - 2]; // 上一页
    prevPage.setData({
      'new_info.brand.id': detail._id,
      'new_info.brand.name' : detail.Chinese_name
    })
  
    wx.navigateBack({ //返回
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    var result = await model.getBrandList()
    console.log(result)
    this.setData({
      list: result
    })


  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady  () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {

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