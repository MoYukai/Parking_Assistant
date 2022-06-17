// 云函数入口文件
const cloud = require('wx-server-sdk')
const db = require('./db/db')

// 云函数入口函数
exports.main = async (event, context) => {
  var result
  
  result = await db.removeByValue(event.name,event.value)
  return {
    result
  }
}