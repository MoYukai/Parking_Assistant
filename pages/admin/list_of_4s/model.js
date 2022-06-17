const db = require('../../../common_db/database')
class model{
  constructor(){

  }
  static async getDealer(){
    var list = await db.get("dealer","")
    return list
  }
}
module.exports = model