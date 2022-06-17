const db = wx.cloud.database()
const _ = db.command
class database {
  constructor() {

  }
  static async cloud_del_by_value(name,value){
    var result
   result = await wx.cloud.callFunction({
      name:'DB',
      data:{
        name,value
      }
    })

    return result
  }

  /**
   * @param {String} name 数据库名称
   * @param {Array} value 查询匹配值
   */
  static async get(name, value) {
    console.log("匹配值：",value)
    var result
    await db.collection(name).where(value).get().then(res => {
      result = res
    }).catch(err => {
      result = err
    })
    return result
  }
  static async add(name,value){
    var result
    await db.collection(name).add(value).then(res=>{
      result = res
    }).catch(err=>{
      result = err
    })
    return result 
  }

  static async del(name,value){
    var result
    await db.collection(name).where(value).remove().then(res=>{
      result = res
    }).catch(err=>{
      result = err
    })
    return result
  }




}
module.exports = database