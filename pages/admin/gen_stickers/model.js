const db = require('../../../common_db/database')
class model {
  constructor() {

  }
  static async getHis() {
    var result = await db.get("stickers_records", "")
    return result
  }

  static async gen_stickers_db(new_info) {
    console.log(new_info)
    var REC = await this._gen_rec(new_info)
    console.log(REC._id)
    var result = await this._gen_stickers(new_info, REC._id)
    return result
  }

  static async _gen_stickers(new_info, records_id) {
    var result
    await wx.cloud.callFunction({
      name: "stickers_generate",
      data: {
        new_info,
        records_id
      }
    }).then(res => {
      result = res
    }).catch(err => {
      result = err
    })
    return result
  }
  static async _gen_rec(new_info) {
    var result
    var obj = {
      "data": {
        new_info,
        createTime: (new Date()).getTime()
      }
    }
    result = await db.add("stickers_records", obj)

    return result
  }

  static async del_stickers_by_recid(records_id) {
    var obj = {
      records_id
    }
    var del_result = await db.cloud_del_by_value("stickers", obj)
    obj = {
      _id: records_id
    }
    var del_rec_result = await db.cloud_del_by_value("stickers_records", obj)
    return {
      del_result,
      del_rec_result
    }
  }

}
module.exports = model