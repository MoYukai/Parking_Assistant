const cloud = require('wx-server-sdk')
cloud.init()

const tencentcloud = require("tencentcloud-sdk-nodejs");

const SmsClient = tencentcloud.sms.v20190711.Client;

const clientConfig = {
  credential: {
    secretId: "*****",
    secretKey: "******",
  },
  region: "",
  profile: {
    httpProfile: {
      endpoint: "sms.tencentcloudapi.com",
    },
  },
};

const client = new SmsClient(clientConfig);
const params = {
    "TemplateID": "***",
    "SmsSdkAppid": "***",
    "Sign": "****"
};


// 云函数入口函数
exports.main = async (event, context) => {
  var message = ""
  var code = event.code + ""
  var phone = "+86"+event.phone
  params.PhoneNumberSet = [phone]
  params.TemplateParamSet = [code]

  await client.SendSms(params).then(
    (data) => {
      console.log(data);
      message = data
    },
    (err) => {
      console.error("error", err);
    }
  )
  return {
    message : message,
    code:event.code,
    phone:event.phone

  }
}