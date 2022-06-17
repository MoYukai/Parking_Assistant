const db = wx.cloud.database()
const _ = db.command
class model {
  constructor() {

  }
  legal(seriesno) {
    return new Promise((resolve, reject) => {
      db.collection('stickers').where({
        seriesno
      }).get().then(res => {
        console.log(res)
        if (res.data.length == 0) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
  brandnew(seriesno) {
    return new Promise((resolve, reject) => {
      db.collection('stickers').where({
        seriesno
      }).get().then(res => {
        console.log(res.data[0].belongTo)
        if (res.data[0].belongTo != null) {
          resolve(false)
        } else {
          resolve(true)
        }
      }).catch(err => {
        console.log(err)
      })
    })
  }
  owner(seriesno) {
    return new Promise(() => {

    })

  }
  mycode(seriesno) {
    return new Promise((resolve,reject)=>{
      db.collection('stickers').where({
        'belongTo.user' : wx.getStorageSync('openId'),
        'seriesno' : seriesno
      }).get().then(res=>{
        console.log(res.data.length)
        if(res.data.length == 1){
          resolve(true)
        }
        if(res.data.length == 0){
          resolve(false)
        }

      })
    })
  }

  async checkSeriesNo(seriesno) {
    if (!await this.legal(seriesno)) {
      console.log("无效系列号参数")
      return 0
    }
    if (await this.brandnew(seriesno)) {
      return 1
    }
    if (await this.mycode(seriesno)) {
      return 2
    }
    if (!await this.mycode(seriesno)) {
      return 3
    }




  }
}

module.exports = model