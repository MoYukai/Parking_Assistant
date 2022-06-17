const db = wx.cloud.database()
const _ = db.command
import Model from './../../common_model/model'
var mod = new Model()
class model {
  constructor() {

  }
  async changeSwitch(sn, value, type) {
    var result
    var doc = await mod.getDocByNo(sn)
    console.log(doc)
    if (type == "sms") {
      await db.collection('stickers').doc(doc).update({
        data: {
          smsSwitch: value
        }
      }).then(res => {
        result = res
      })
    } else if (type == "phone") {
      await db.collection('stickers').doc(doc).update({
        data: {
          phoneSwitch: value
        }
      }).then(res => {
        result = res
      })
    }
    return result
  }
  async getData() {
    var obj
    await db.collection('stickers').where({
      'belongTo.user': wx.getStorageSync('openId')
    }).get().then(res => {
      obj = res.data
    })
    return {
      obj
    }

  }
  async disBind(sn) {
    var doc = await mod.getDocByNo(sn)
    console.log(doc)
    var result
    await db.collection('stickers').doc(doc).update({
      data: {
        belongTo: _.remove(),
        car: _.remove(),
        phone: _.remove(),
        phoneSwitch: _.remove(),
        smsSwitch: _.remove()
      }

    }).then(res => {
      result = res
    })
    return result
  }

}
module.exports = model