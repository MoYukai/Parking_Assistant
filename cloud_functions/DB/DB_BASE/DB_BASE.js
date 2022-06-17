const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
class DB_BASE{
  constructor(){

  }
  static async print(e){
    console.log(e)
  }
  static async removeByValue(name,value){
   return await db.collection(name).where(value).remove()

  }
}
module.exports = DB_BASE