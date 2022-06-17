import Model from './model'
var model = new Model()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info :'',
    show : false

  },
  async Switch(e){
    var sn = e.target.dataset.sn
    var value = e.detail.value
    var type = e.target.dataset.switch
    console.log(sn)
    console.log(value)
    console.log(type)
    var result = await model.changeSwitch(sn,value,type)
    console.log(result)

  },
  edit_info(e){
    var sn = e.currentTarget.dataset.seriesno
    wx.navigateTo({
      url: '../bindQR/bindQR?seriesno='+sn,
    })
  },
  btn(e) {
    console.log(e.currentTarget.dataset.seriesno)

  },
  dis_bind_show(e){
    console.log(e.currentTarget.dataset.seriesno)
    this.setData({
      show : true,
      pro_sn:e.currentTarget.dataset.seriesno
    })
  },
  dis_bind_hide(){
    this.setData({
      show : false,
      pro_sn:''
    })
  },
  async dis_bind() {
    wx.showLoading({
      title: '解绑中…',
    })
    var result = await model.disBind(this.data.pro_sn)
    console.log(result)
    if(result.errMsg == "document.update:ok"){
      wx.showToast({
        title: '解绑成功！',
        icon: 'none',
        mask: true,
      })
      var object = await model.getData()
      this._setData(object)
      this.setData({
        show : false
      })

    }else{
      wx.showToast({
        title: '解绑失败',
        icon: 'none',
        mask: true,
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(this.data.info)
    console.log("onLoad")
    var object = await model.getData()
    this._setData(object)
    console.log(this.data.info)
  },

  _setData(object) {
    this.setData({
      info: object.obj
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
    this.onLoad()


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