const area = require('../../../utils/areaList')
const model = require('./model')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '',
    regionShow: false,
    areaList: area.default,
    list_4s:''
  },
  getvalue(e){
    var detail = e.currentTarget.dataset.detail
    console.log(detail)
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
     "new_info.dealer.id" : detail._id,
     "new_info.dealer.name" :detail.dealer_name
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  showPopup() {
    this.setData({ regionShow: true });
  },

  onClose() {
    this.setData({ regionShow: false });
  },
  regionConfirm(e) {
    var region = e.detail.values
    var province = region[0].name
    var city = region[1].name
    var area = region[2].name
    console.log(province, city, area)
    this.setData({
      region: region
    })
    this.setData({ regionShow: false });
  },
  regionCancel() {
    this.setData({ regionShow: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(area)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow  () {
    var list = await model.getDealer()
    this.setData({
      list_4s : list.data
    })
    console.log(this.data.list_4s)

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