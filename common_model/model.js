const db = wx.cloud.database()
const _ = db.command
import DB from '../common_db/database'
var mydb = new DB()
class model {
  constructor() {

  }
  async checkSeriesNo(seriesno) {
    var name = "stickers"
    var value = {
      seriesno
    }
    var dbres = await mydb.get(name, value)
    console.log(dbres)
    console.log(dbres.data.length)
    if (dbres.data.length == 1) {
      if(dbres.data[0].belongTo == undefined){
        return true
      }
      return false
    }
    if (dbres.data.length == 0) {
      return false
    }
  }
  async getDocByNo(seriesno) {
    var result
    await db.collection('stickers').where({
      seriesno
    }).get().then(res => {
      result = res.data[0]._id
    })
    return result
  }
  async getPhoneBySn(seriesno) {
    var result
    await db.collection('stickers').where({
      seriesno
    }).get().then(res => {
      result = res.data[0].phone
    })
    return result
  }
  async getCarBySn(seriesno) {
    var result
    await db.collection('stickers').where({
      seriesno
    }).get().then(res => {
      result = res.data[0].car
    })
    return result
  }
  async getPhoneStatus(seriesno) {
    var result
    await db.collection('stickers').where({
      seriesno
    }).get().then(res => {
      result = res.data[0].phoneSwitch
    })
    return result

  }
  async getSmsStatus(seriesno) {
    var result
    await db.collection('stickers').where({
      seriesno
    }).get().then(res => {
      result = res.data[0].smsSwitch
    })
    return result

  }
}

module.exports = model