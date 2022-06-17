// 云函数入口文件
const cloud = require('wx-server-sdk')
const QR = require('./qr_generate/qr-generate')
const sn_checker = require('./sn_checker/sn_checker')
const sn_saver = require('./sn_saver/sn_saver')
const Random = require('./random/random')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //要生成的挪车码数量
  var new_info = event.new_info
  var amount = new_info.amount
  var brand = new_info.brand.name
  var tag = new_info.tag
  var head = new_info.headno
  var dealer = new_info.dealer.name
  var printed = new_info.printed
  var available = new_info.available
  
  var records_id = event.records_id

  var nowIndex = 1
  var array = []
  var saveRes = []
  while(nowIndex <= amount){
    var random = Random.bit(12)
    var seriesno = head+random
    var result = await sn_checker.seriesno(seriesno)
    if(result >= 1){
      continue
    }
    if(result == 0){
      saveRes.push(await sn_saver.seriesno(seriesno,brand,tag,dealer,printed,available,records_id)) 
      array.push(seriesno) 
      nowIndex++
    }


  }

  //随机生成
  return {
    amount,
    array,
    saveRes
  }
}