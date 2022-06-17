import Model from './model.js'
var model = new Model()
import CommonModel from '../../common_model/model'
var common_model = new CommonModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async scan() {
    var result
    var seriesno
    await wx.scanCode({
      onlyFromCamera: true,
    }).then(res => {
      result = res
      var url = result.result
      seriesno = url.split('=')[1]
      console.log(seriesno)
    }).catch(err => {
      result = err
    })
    console.log(result.errMsg)
    if(result.errMsg == "scanCode:fail cancel"){
      wx.showToast({
        title: '取消了扫码',
        icon:'none'
      })
      return 
    }

    var sta = await common_model.checkSeriesNo(seriesno)
    if (sta == false) {
      wx.showToast({
        title: '二维码无效或者已经被绑定',
        icon: 'none'
      })
    } else {
        wx.navigateTo({
          url: '../bindQR/bindQR?seriesno=' + seriesno,

      })

    }


  },
  coding() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },
  gotoGetMyCode(){
    wx.navigateTo({
      url: '../getMyQR/getMyQR',
    })

  },
  async onLoad(options) {

    var QRCodeOrderIdObj = decodeURIComponent(options.q)
    console.log(QRCodeOrderIdObj)
    var idStr1 = QRCodeOrderIdObj
    var seriesno = idStr1.split('=')[1]
    console.log(seriesno)



    //TODO 如果挪车码未被绑定,进入绑定页面

    //TODO 如果挪车码已被绑定
    //TODO  如果是自己账号的挪车码，则进入管理我的挪车码页面
    //TODO  如果是别人账号的挪车码，则进入拨号挪车页面
    if (seriesno != null) {
      var TYPE = await model.checkSeriesNo(seriesno)
      if (TYPE == 0) {
        wx.showToast({
          title: '无效二维码，请联系客服',
          icon: 'none',
          duration: 1900
        })
        return
      }
      //全新二维码--去绑定
      if (TYPE == 1) {
        wx.navigateTo({
          url: '../bindQR/bindQR?seriesno=' + seriesno,
        })
        return
      }
      //自己的二维码
      if (TYPE == 2) {
        console.log("自己的二维码")
        wx.navigateTo({
          url: '../manageQR/manageQR',
        })

      }
      if (TYPE == 3) {
        console.log("别人的二维码")
        wx.navigateTo({
          url: '../scanResult/scanResult?seriesno=' + seriesno,
        })
      }
    } else {
      console.log("无参数进入首页")
    }


  },


  onReady: function () {

  },

  onShow: function () {

  },

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