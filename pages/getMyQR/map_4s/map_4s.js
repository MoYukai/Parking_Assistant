const search = require('../../../utils/search')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    show: false,
    pop: '',
    scale: 12,
    includeAll: [
    ],
    dealer: [
      {
        id: 55,
        name: "广州市锦龙(奥迪)汽车发展有限公司",
        phone: "(020)82168898",
        address: "广州市 天河区 奥体路55号",
        distance: "19.5km",
        longitude: "113.418922",
        latitude: "23.141186",
        picture: "../../static/img/01.jpg"
      }, {
        id: 66,
        name: "广州永佳丰田汽车销售服务有限公司",
        phone: "(020)34891888",
        address: "广州市 番禺区 大石迎宾路202号",
        distance: "15.5km",
        longitude: "113.338651",
        latitude: "23.026371",
        picture: "../../static/img/00.jpg"
      }
    ],
    area: "广东省 广州市"

  },
  select(e) {

    console.log("点击4sTab", e.detail.id)
    this._viewWithID(e.detail.id)


  },
  openLoc(e) {
    let id = e.detail.id
    console.log("点击到这里去",id)
    let res = search.byId(id, this.data.dealer)
    wx.openLocation({
      latitude: parseFloat(res[0].latitude),
      longitude: parseFloat(res[0].longitude),
      name:res[0].name,
      address:res[0].address
    })
  },
  bindmarkertap(e) {
    let id = e.detail.markerId
    console.log("点击标记", id)
    this._showPop(id)
  },
  callouttap(e) {
    console.log(e.detail.markerId)
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
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
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getLocation({
    }).then(res=>{
      console.log("接受")
    }).catch(err=>{
      console.log("拒绝")
    })
    this._pushDealerToAll(this.data.dealer)
  },
  async _pushDealerToAll(dealer) {
    let length = dealer.length
    let All = []
    for (let i = 0; i < length; i++) {
      All.push({
        longitude: dealer[i].longitude,
        latitude: dealer[i].latitude
      })
    }
    let Loc = await wx.getLocation({
    })
    .then(res=>{
      console.log(res)
      All.push({
        longitude: res.longitude,
        latitude: res.latitude
      })
      this.setData({
        includeAll: All
      })
    })
    .catch(res=>{
      this.setData({
        includeAll: All
      })
    })

  },
  _showPop(id) {
    let res = search.byId(id, this.data.dealer)
    this.setData({
      show: true,
      'pop.name': res[0].name,
      'pop.address': res[0].address,
      'pop.phone': res[0].phone,
      'pop.picture': res[0].picture,
      'pop.longitude' : res[0].longitude,
      'pop.latitude' :  res[0].latitude
    })
  },
  async _viewWithID(id) {
    let res = search.byId(id, this.data.dealer)
    console.log(res)
    await this.mapCtx.moveToLocation({
      longitude: parseFloat(res[0].longitude),
      latitude: parseFloat(res[0].latitude)
    }).then(res => {
      console.log(res)
    }).catch(res=>{
      console.log(res)
    })

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