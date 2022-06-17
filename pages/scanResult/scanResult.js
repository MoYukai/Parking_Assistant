const {Base64} = require('js-base64');
import Pub from './../../common_model/model' 
var pub = new Pub()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      car:'-- -----',
      phone:'',
      showPhone:true,
      showSMS:true
    },
    smsDisable:false,
    smsBtn:'发送短信通知',
    phoneDisable:false,
    phoneBtn:'拨打电话通知'

  },
  async makeCall() {
    this.setData({
      phoneDisable : true,
      phoneBtn:'正在处理中'
    })
    console.log("点击了拨打电话")
    wx.showLoading({
      title: '准备拨号…',
    })
    var result
    console.log(this.data.info.phone)
    await wx.cloud.callFunction({
      name: 'AXN',
      data: {
        PhoneNoA:this.data.info.phone,
      }
    }).then(res => {
      result = res
    }).catch(err => {
      result = err
    })
    wx.showToast({
      title: '准备完成',
      icon : 'none'
    })
    this.setData({
      phoneDisable: false,
      phoneBtn:'拨打电话通知'
    })
    console.log(result)
    console.log(result.result.result.secretNo)
    wx.makePhoneCall({
      phoneNumber: result.result.result.secretNo,
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  async sendSms() {
    wx.showLoading({
      title: '正在发送…',
    })
    console.log("点击了发送短信")
    var result
    await wx.cloud.callFunction({
      name : 'sms_noti',
      data:{
        car : this.data.info.car,
        address : "",
        phone:this.data.info.phone
      }
    }).then(res=>{
      result = res
    }).catch(err=>{
      result = err
    })
    console.log(result.result.message.SendStatusSet[0].Code)
    if(result.result.message.SendStatusSet[0].Code == "Ok"){
      wx.showToast({
        title: '成功发送',
        icon:'success'
      })
      this.setData({
        smsDisable : true,
        smsBtn:'已经成功发送短信'
      })
    }else{
      wx.showToast({
        title: '短信发送失败，请通过拨打电话联系对方',
        icon:'none'
      })
    }
  },


  base64ToString(base64Str) {
    var str = new Buffer.from(base64Str, 'base64').toString();
    return str;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    var sn = options.seriesno
    console.log(sn)
    var phone = await pub.getPhoneBySn(sn)
    var car = await pub.getCarBySn(sn)
    var showPhone = await pub.getPhoneStatus(sn)
    var showSMS = await pub.getSmsStatus(sn)
    console.log(phone)
    this.setData({
      "info.phone":phone,
      "info.car":car,
      "info.showPhone":showPhone,
      "info.showSMS":showSMS
    })


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