const DB_BASE = require("../DB_BASE/DB_BASE")
class db extends DB_BASE{
  constructor(){

  }
  static async removeByValue(name,value){
    return await DB_BASE.removeByValue(name,value)
  }
}
module.exports = db