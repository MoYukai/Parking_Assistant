const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const PLSClient = require('@alicloud/pls-sdk')
const { Base64 } = require('js-base64');
const accessKeyId = '****'
const secretAccessKey = '****'
const queueName = '***'
const PoolKey = '****'
const plsClient = new PLSClient({
  accessKeyId,
  secretAccessKey
})
// 云函数入口函数
class model{
  constructor(){

  }
  static async getMyRec(phone){
    if(phone == ""){
      return {
        result : null
      }
    }
    var result 
    await db.collection('call_records').where({
      'messageBody.phone_no' : phone
    }).orderBy('messageBody.call_out_time','desc').get().then(res=>{
      result = res
    }).catch(err=>{
      result = err
    })
    return result

  }
  static async getAllCallRec(){
    var flag = false
    var result = {}
    result.res = "查询到通话记录"
    var time = 0
    var returnResult = []
  
    while (result.res == "查询到通话记录") {
  
      result = await this.atonRec()
      returnResult.push(result)
      if (result.res == "查询到通话记录") {
        time++
      }
  
  
    }
    return { returnResult, time }


  }
  static async _saveRec(messageBody){
    var result
    await db.collection('call_records').add({
      data:{
        messageBody
      }
    }).then(res=>{
      result = res
    }).catch(err=>{
      result = err
    })

    return result
  }
  static async atonRec(){

  var result =await this._getRec()
  if(result.result == "00"){
    return {
      res : "没有通话记录，不作任何操作"
    }
  }else{
    var messageBody = JSON.parse(Base64.decode(result.MessageBody))
    var writeResult = await this._saveRec(messageBody)
    return {
      res : "查询到通话记录",
      rec : messageBody,
      writeResult
       
    }
  }

  }
   static async _getRec(){
    var result
    var nomsg = false
    await plsClient.receiveMsg(0, queueName, 1,  true)
    .then(res=>{
      //消息体需要base64解码
      console.log(res)
      let {
        code,
        body
      } = res
      if (code === 200) {
        //处理消息体,messagebody
        console.log('回执报告:', body)
        result = body
      }
    }).catch(err=>{
      //没有队列消息
      console.log('无队列消息回执报告:', err)
      result = err
      nomsg = true
    })


    if(nomsg == true){
      return {
        result : "00"
      }
    }else{
      return result
    }

  }
}
module.exports = model