const db = require('../../../common_db/database')
import pinyin from "wl-pinyin";
class model {
  constructor() {


  }
  static async getBrandList() {
    var list = await db.get("brand", "")
    var Final_List = await this._cleanList(list.data)
    return(Final_List)
  }

  static async _cleanList(list) {
    console.log("push之前",list)
    var AlphabetList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let List = [];
    for (let k in list) {
      List.push(list[k].Chinese_name)
    }
    console.log("push之后",List)
    //List为清洗完成后的数组，接下来进行排序
    let Final_List = {};
    AlphabetList.forEach((item) => {
      Final_List[item] = [];
      list.forEach((el) => {
        /** 主要在这一句，el代表每个名字如 “安琪拉” ，
          pinyin.getFirstLetter(el) 取的是名字的首字母 “AQL” ，
          .substring(0, 1) 就是只取第一个字符 ‘A’ **/
        let first = pinyin.getFirstLetter(el.Chinese_name).substring(0, 1);
        if (first == item) {
          Final_List[item].push(el)
        }
      })
    })
    return (Final_List)
  }

}
module.exports = model