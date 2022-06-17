const { Base64 } = require('js-base64');
const model = require('../../common_model/model');
import Model from './model'
var module = new Model()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    callRec: [],


  },
  callback(e) {
    var call = e.currentTarget.dataset.peerno
    console.log(call)
    wx.makePhoneCall({
      phoneNumber: call,
    }).then(res => {

    }).catch(err => {

    })
  },
  async _getAndSetMyRec() {
    var myPhone = await module.getPhoneByOpenId()
    console.log(myPhone)
    var result = await module.getMyRec(myPhone)
    console.log(result)
    this.setData({
      callRec: result.result.result.data
    })
    console.log(this.data.callRec.length)
    if (this.data.callRec.length == 0) {
      wx.showToast({
        title: '暂无记录',
        icon : 'none'
      })
    }else{
      wx.showToast({
        title: '获取完成',
      })
    }



  },
  async _getAllRec() {
    await module.getCallRec()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '正在获取…',
    })
    await this._getAllRec()
    await this._getAndSetMyRec()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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