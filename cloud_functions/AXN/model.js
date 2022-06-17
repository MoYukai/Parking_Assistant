const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const moment = require('moment')
const PLSClient = require('@alicloud/pls-sdk')
const accessKeyId = '****'
const secretAccessKey = '****'
const queueName = '****'

const plsClient = new PLSClient({
  accessKeyId,
  secretAccessKey
})
class model {
  constructor() {

  }
  /**
   * @returns [history] SecretBindDTO 
   * @param PhoneNoA 要查询的手机号 
   */
  static async getLastRecByPhoneA(PhoneNoA) {
    var history
    await db.collection('SecretBindDTO').where({
      PhoneNoA
    }).limit(1).orderBy(
      'createTime', 'desc'
    ).get().then(res => {
      history = res.data
    })
    return history
  }
  /**
   * 绑定隐私号
   * @param {String} PoolKey 
   * @param {String} PhoneNoA 
   * @param {String} Expiration 
   */
  static async bindAxn(PoolKey, PhoneNoA, Expiration) {
    var result
    await plsClient.bindAxn({
      PoolKey,
      PhoneNoA,
      Expiration,
      CallDisplayType	: 2
    }).then(res => {
      console.log('绑定axn', res)
      result = res
    })
      .catch(err => {
        console.log('绑定axn失败', err)
        result = err
      })
    if (result.Code == "OK") {
      var SubsId = result.SecretBindDTO.SubsId
      var SecretNo = result.SecretBindDTO.SecretNo
    }else{
      return {
        err : "绑定失败"
      }
    }
    var writeResult = await this.saveSecretBindDTO(SubsId, SecretNo, PhoneNoA)
    return {
      result: {
        message:"newBind",
        secretNo: SecretNo
      }, writeResult
    }
  }

  /**
   * saveSecretBindDTO
   * @param {*} SubsId 
   * @param {*} SecretNo 
   * @param {*} PhoneNoA 
   */
  static async saveSecretBindDTO(SubsId, SecretNo, PhoneNoA) {
    var result
    await db.collection('SecretBindDTO').add({
      data: {
        SubsId,
        SecretNo,
        PhoneNoA,
        createTime: moment().valueOf()
      }
    }).then(res => {
      console.log(res)
      result = res
    }).catch(err => {
      console.log(err)
      result = res
    })

    return result
  }

  static async querySubscriptionDetail(PoolKey, SubsId, PhoneNoX) {
    var result
    await plsClient.querySubscriptionDetail({
      PoolKey,
      SubsId,
      PhoneNoX,
    }).then(res => {
      result = moment(res.SecretBindDetailDTO.ExpireDate).format("YYYY-MM-DD HH:mm:ss")
    }).catch(err => {
      console.log('查询绑定关系详情失败', err)
    })
    return result
  }

  static async updateSubscription(PoolKey, SubsId, PhoneNoX, Expiration, PhoneNoA) {
    var result
    await plsClient.updateSubscription({
      PoolKey,
      SubsId,
      PhoneNoX,
      OperateType: 'updateExpire',
      Expiration
    }).then(res => {
      console.log('更新绑定关系', res)
      result = res
    }).catch(err => {
      console.log('更新绑定关系失败', err)
      result = err
    })
    var writeResult = await this.saveSecretBindDTO(SubsId, PhoneNoX, PhoneNoA)
    return {
      result: {
        message:"updateBind",
        secretNo: PhoneNoX
      }, writeResult
    }
  }
}
module.exports = model