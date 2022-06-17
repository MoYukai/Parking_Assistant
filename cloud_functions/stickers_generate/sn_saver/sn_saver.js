const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
class saver{
  constructor(){

  }
  static async seriesno(seriesno,brand,tag,dealer,printed,available,records_id){
    var createTime = (new Date()).getTime()
    var result
    await db.collection('stickers').add({
      data:{
        seriesno,
        brand,
        tag,
        createTime,
        dealer,
        printed,
        available,
        records_id
      }
    }).then(res=>{
      result = res
    }).catch(err=>{

    })

    return result
  }

}
module.exports = saver