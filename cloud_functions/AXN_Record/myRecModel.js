const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const PLSClient = require('@alicloud/pls-sdk')
const { Base64 } = require('js-base64');
const accessKeyId = '***'
const secretAccessKey = '****'
const queueName = '****'
const PoolKey = '*****'
const plsClient = new PLSClient({
  accessKeyId,
  secretAccessKey
})

class myRecModel{
  constructor(){

  }
  
}
module.exports = myRecModel