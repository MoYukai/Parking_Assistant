const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const PLSClient = require('@alicloud/pls-sdk')
const accessKeyId = '****'
const secretAccessKey = '****'
//在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName
const queueName = '****'
const PoolKey = '***'

//初始化sms_client
const plsClient = new PLSClient({
  accessKeyId,
  secretAccessKey
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("调试")
  var SubsId, SecretNo, PhoneNoA
  await db.collection('SecretBindDTO').where({
    PhoneNoA: event.PhoneNoA
  }).orderBy(
    '_id', 'desc'
  ).get().then(res => {
    if (res.data != '') {
      SubsId = res.data[0].SubsId
      SecretNo = res.data[0].SecretNo
      PhoneNoA = res.data[0].PhoneNoA
    }
    console.log(res)

  })

  var RESULT
  if (PhoneNoA == '') {
      console.log("从来没有绑定过",PhoneNoA)
    //从来没有绑定过
    return 5

  } else {
    //绑定过，需要检查状态

    await plsClient.querySubscriptionDetail({
      PoolKey,
      SubsId: SubsId,
      PhoneNoA: PhoneNoA,
      PhoneNoX: SecretNo
    }).then(function (res) {
      console.log('查询绑定关系详情', res)
      RESULT = res
    }, function (err) {
      console.log('查询绑定关系详情失败', err)
    })
  }



  return {
    RESULT
  }
}