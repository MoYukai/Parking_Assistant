
const db = require('../common_db/database')
class admin{
  constructor(){

  }
  async openIdAdmin(openId){
    var dbname = 'users'
    var value = {
      '_openid' : openId,
      'userInfo.admin' : true
    }
    var result = await db.get(dbname,value)
    if(result.data.length == 0){
      return false
    }else if(result.data.length == 1){
      return true
    }

    return false
  }
}
module.exports = admin