const { Base64 } = require('js-base64');
const db = wx.cloud.database()
const _ = db.command
class model {
  constructor() {

  }

  async getPhoneByOpenId(){
    var result
    await db.collection('stickers').where({
      'belongTo.user' : wx.getStorageSync('openId')
    }).get().then(res=>{
      result = res.data[0].phone
    }).catch(err=>{
      result = err
    })

    return result
  }
  async getCallRec() {
    var result
    await wx.cloud.callFunction({
      name: 'AXN_Record',
      data: {
        type:"getAll"
      }
    }).then(res => {
      result = res
    }).catch(err => {
      result = res
    })
    console.log(result) 
  }
  async getMyRec(phone){
    var result
    await wx.cloud.callFunction({
      name: 'AXN_Record',
      data: {
        type:"getMy",
        phone
      }
    }).then(res => {
      result = res
    }).catch(err => {
      result = err
    })
    return result
  }

  
  async saveAllRec(peer_no,call_time,sub_id){
    var result 
    await db.collection('call_records').add({
      data:{
        peer_no,
        call_time,
        sub_id
      }
    }).then(res=>{
      result = res
    }).catch(err=>{
      result = err
    })

    return result
  }

}
module.exports = model