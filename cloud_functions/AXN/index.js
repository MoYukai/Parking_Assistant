const cloud = require('wx-server-sdk')
cloud.init()
const moment = require('moment')
const model = require('./model')
const queueName = '****'
const PoolKey = '***'
exports.main = async (event, context) => {
  var PhoneNoA = event.PhoneNoA 
  var Expiration = moment(new Date()).add(5, 'minutes').format("YYYY-MM-DD HH:mm:ss")

  var history = await model.getLastRecByPhoneA(PhoneNoA)
  console.log("查询到的历史记录",history)

  if (history.length == 0) {
    console.log("无历史记录")
    var result = await model.bindAxn(PoolKey, PhoneNoA, Expiration)
    return result
  } else {
    //查询绑定关系详情
    var lastBindEXP = await model.querySubscriptionDetail(PoolKey, history[0].SubsId, history[0].SecretNo)

    var now = moment().format("YYYY-MM-DD HH:mm:ss")
    var status = moment(now).isBefore(lastBindEXP)
    console.log("现在的时间", now)
    console.log("上一次绑定过期的时间", lastBindEXP)
    console.log("是否未过期", status)
    if (status) {
      //未过期，延期
      // 更新绑定关系
      var result = await model.updateSubscription(PoolKey, history[0].SubsId, history[0].SecretNo, Expiration,PhoneNoA)
      console.log(result)
      return result
    } else {
      //已过期，重新绑定
      var result = await model.bindAxn(PoolKey, PhoneNoA, Expiration)
      return result
    }

  }

}