import Admin from '../../common_model/admin'
var admin = new Admin()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:false

  },
  gotoAdmin(){
    wx.navigateTo({
      url: '../admin/index/index',
    })
  },
  gotoManageQR(){
    wx.navigateTo({
      url: '../manageQR/manageQR',
    })
  },
  gotoCallRec(){
    wx.navigateTo({
      url: '../callRecords/callRecords',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad  (options) {
    var openId = wx.getStorageSync('openId')
    var result = await admin.openIdAdmin(openId)
    console.log(result)
    if(result == true){
      this.setData({
        isAdmin : true
      })
    }

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