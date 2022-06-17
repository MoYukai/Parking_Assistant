const db = wx.cloud.database()
const _ = db.command
class model {
  constructor() {

  }
  async getData(sn){
    var result
    await db.collection('stickers').where({
      seriesno : sn 
    }).get().then(res=>{
      result = res
    }).catch(err=>{
      result = err
    })
    return result
  }
  getDocByNo(seriesno) {
    return new Promise((resolve,reject) => {
      db.collection('stickers').where({
        seriesno
      }).get().then(res => {
        resolve(res.data[0]._id)
      })
    })
  }
  async bindCarPhone(seriesno, car, phone,phoneSwitch,smsSwitch) {
    var doc = await this.getDocByNo(seriesno)

    return new Promise((resolve, reject) => {
      db.collection('stickers').doc(doc).update({
        data: {
          belongTo:{
            user : wx.getStorageSync('openId')
          },
          phone:phone,
          car:car,
          phoneSwitch,
          smsSwitch
        }
      }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
module.exports = model