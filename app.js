// const miniShopPlugin = requirePlugin('mini-shop-plugin')
let db = null
App({
  onLaunch() {
    // miniShopPlugin.initApp(this, wx)
    wx.cloud.init({
      traceUser: true,
      env: "****"
    })
    db = wx.cloud.database()
    this.asyncUserDomain()

   

  },
  onShow(){
    this._checkForUpdate()
  },
  _checkForUpdate(){
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("是否有新版本",res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {

            updateManager.applyUpdate()

    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  // 执行方法：判断是否是新用户。如果是，则新增数据且将openID以及UserId存入缓存，否则，直接读取数据，将数据写入缓存
  async asyncUserDomain() {
    // 获取用户的OPenid
    const openId = await this.getUserOpenId()
    wx.setStorageSync('openId', openId)
    const userData = await this.getUserDataLocal(openId)
    // console.log(userData)
    // 新用户
    if (userData.data.length == 0) {
      const addUserData = await this.addUserDataLocal()
      if (addUserData.errMsg != 'collection.add:ok') {
        console.log("数据库新增用户失败")
        return
      }
      await wx.setStorage({
        data: addUserData._id,
        key: "userId",
      })
    }
    // 老用户直接缓存用户ID
    else {
      await wx.setStorage({
        data: userData.data[0]._id,
        key: "userId",
      })
    }
  },

  // 获取用户openId
  getUserOpenId() {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getUserInfo',
      })
        .then(res => {
          wx.setStorage({
            data: res.result.openid,
            key: 'openId',
          })
          resolve(res.result.openid)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  // 新增用户信息
  addUserDataLocal() {
    return new Promise((resolve, reject) => {
      db.collection('users').add({
        data: {
          userInfo: {
            userPhone: null,
            userHeader: null,
            userNick: null,
            userGender: null,
            createTimestamp: new Date().getTime(),
            available: true
          }
        }
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 获取用户信息
  getUserDataLocal(openid) {
    return new Promise((resolve, reject) => {
      db.collection('users').where({
        _openid: openid
      }).get()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  globalData: {
    userInfo: null
  }
})
