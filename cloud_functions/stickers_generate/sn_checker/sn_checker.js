const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
class checker{
  constructor(){

  }
  static async seriesno(seriesno){
    var result
    await db.collection('stickers').where({
      seriesno
    }).get().then(res=>{
      result = res.data.length
    }).catch(err=>{
      result = err
    })
    return result
  }

}
module.exports = checker