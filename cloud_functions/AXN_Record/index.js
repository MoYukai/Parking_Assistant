const cloud = require('wx-server-sdk')
cloud.init()
const PLSClient = require('@alicloud/pls-sdk')
const { Base64 } = require('js-base64');
const accessKeyId = '**'
const secretAccessKey = '**'
const queueName = '**'
const PoolKey = '**'
const model = require('./model')
const myRecModel = require('./myRecModel')
const plsClient = new PLSClient({
  accessKeyId,
  secretAccessKey
})
// 云函数入口函数
exports.main = async (event, context) => {
  var type = event.type
  if (type == "getAll") {
    var result = await model.getAllCallRec()
    return result
  }
  if (type == "getMy") {
    var result = await model.getMyRec(event.phone)
    return {
      result
    }
  }

}