import Model from './model.js'
var model = new Model()
const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const {
	phoneChecker
} = require("../../utils/util.js")
const Checker = require("../../utils/util.js")
Page({
	data: {
		show: false,
		isCarBoard: false,
		carNumStr: [], //IMPORTANT
		carType: 1, // 车牌类型默认为1普通车牌,2为新能源车牌
		carBoxNum: 7,
		abc: false,
		seriesno: '', //IMPORTANT
		phone: '',  //IMPORTANT
		phoneSwitch: true,//IMPORTANT
		smsSwitch: true,//IMPORTANT
		code: '',
		codeInput: '',
		bindPhone: '',
		flag: 0,
		num: 60,
		tips: '发送验证码',
		smsDisable: false,
		clock: ''
	},
	onShow(){
		this.searchAddr("广州市永佳丰田")
	},
	searchAddr(addr) {
		qqmapsdk.geocoder({
			address:addr,
			success:function(res){
				console.log
			},
			fail:function(err){
				console.log(err)
			},
			complete:function(com){
				console.log(com)
			}
		})

	},
	async onLoad(options) {
		qqmapsdk = new QQMapWX({
			key: 'QCOBZ-7YQK3-Q6V3M-3364A-6EKF7-YLB4R'
		})
		if(options.seriesno == null || options.seriesno == undefined){
			wx.showToast({
				title: '无参数',
				icon : 'none'
			})
			return
		}
		this.setData({
			seriesno: options.seriesno
		})
		var data = await model.getData(options.seriesno)
		console.log(data)
		console.log(data.data[0].belongTo)
		if (data.data[0].belongTo == undefined) {
			console.log("全新")
			return
		}
		if (data.data[0].belongTo != undefined) {
			console.log("更新信息")
			var carNum = data.data[0].car
			carNum = carNum.split('')
			console.log(carNum)
			this.setData({
				phone: data.data[0].phone,
				carNumStr: carNum
			})
		}


	},
	gotoMang() {
		wx.redirectTo({
			url: '../manageQR/manageQR',
		})
	},
	sendSms() {
		var random = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
		this.setData({
			code: random
		})
		wx.showLoading({
			title: '发送中',
		})
		this.closeMask()
		if (!phoneChecker(this.data.phone)) {
			wx.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			})
			return
		}
		if (phoneChecker(this.data.phone)) {
			wx.cloud.callFunction({
				name: 'sms',
				data: {
					phone: this.data.phone,
					code: this.data.code
				}
			}).then(res => {
				console.log(res.result)
				if (res.result.message.SendStatusSet[0].Code == "Ok") {
					this.setData({
						bindPhone: res.result.phone
					})
					wx.showToast({
						title: '验证码已发出',
						icon: 'none'
					})
					this.doloop()
					this.data.clock = setInterval(this.doloop, 1000)

				} else {
					wx.showToast({
						title: '操作频繁，请稍后再试',
						icon: 'none'
					})
				}
			})
		}
	},
	doloop() {
		this.data.num--
		if (this.data.num > 0) {
			this.setData({
				tips: this.data.num + "S",
				smsDisable: true
			})
		} else {
			clearInterval(this.data.clock)
			this.setData({
				tips: "发送验证码",
				smsDisable: false
			})
		}

	},
	phoneInput(e) {
		var input = e.detail.value
		this.setData({
			phone: input
		})
	},
	codeInput(e) {
		var input = e.detail.value
		this.setData({
			codeInput: input
		})
	},

	bindAndUse() {
		wx.showLoading({
			title: '正在绑定中',
		})
		this.closeMask()
		if (this.data.flag > 2) {
			wx.showToast({
				title: '验证码多次错误，请重新获取',
				icon: 'none'
			})
			this.setData({
				flag: 0,
				code: ''
			})
			return
		}
		console.log("车牌", this.data.carNumStr.join(""))
		console.log("手机号", this.data.phone)
		console.log("验证码", this.data.code)

		if (this.data.carNumStr.length < 7) {
			wx.showToast({
				title: '请完整输入车牌号',
				icon: 'none'
			})
			return
		}
		if (!Checker.phoneChecker(this.data.phone)) {
			wx.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			})
			return
		}
		if (this.data.code == '') {
			wx.showToast({
				title: '请先获取验证码',
				icon: 'none'
			})
			return
		}
		if (this.data.codeInput == '') {
			wx.showToast({
				title: '验证码为空',
				icon: 'none'
			})
			return
		}
		if (this.data.code != this.data.codeInput) {
			this.setData({
				flag: this.data.flag + 1
			})
			wx.showToast({
				title: '验证码错误',
				icon: 'none'
			})
			return
		}
		if (this.data.phone != this.data.bindPhone) {
			wx.showToast({
				title: '请勿试图绕过验证',
				icon: 'none'
			})
			return
		}

		model.bindCarPhone(
			this.data.seriesno,
			this.data.carNumStr.join(""),
			this.data.phone,
			this.data.phoneSwitch,
			this.data.smsSwitch
		).then(res => {
			console.log(res.errMsg)
			if (res.errMsg == "document.update:ok") {
				wx.hideLoading({
					success: (res) => { },
				})
				this.showPopup()

			} else {
				wx.hideLoading({
					success: (res) => { },
				})
				wx.showToast({
					title: '绑定出错',
					icon: 'none'
				})
			}
		}).catch(err => {
			wx.hideLoading({
				success: (res) => { },
			})
			wx.showToast({
				title: '系统错误',
				icon: 'none'
			})
			console.log(err)
		})

	},
	showPopup() {
		this.setData({
			show: true
		});
	},

	onClose() {
		this.setData({
			show: false
		});
	},
	// 打开车牌号键盘
	openCarBoard(e) {
		if (this.data.carNumStr.length > 0) {
			this.data.abc = true
		} else {
			this.data.abc = false
		}
		this.setData({
			isCarBoard: true,
			abc: this.data.abc
		})
	},
	// 关闭遮罩键盘 并 获取输入的车牌
	closeMask() {
		this.setData({
			isCarBoard: false
		})
		console.log("输出结果", this.data.carNumStr.join(""))
	},
	// 车牌号键盘点击事件
	onMyEvent(e) {
		let type = e.detail
		switch (type) {
			case "confirm":
				this.data.isCarBoard = false
				console.log("输出结果", this.data.carNumStr.join(""))
				break;
			case "cancel":
				this.data.isCarBoard = false
				break;
			case "backspace":
				if (this.data.carNumStr.length > 0) {
					this.data.carNumStr.pop()
					if (this.data.carNumStr.length < 2) {
						this.data.abc = false
					}
				}
				break;
		}
		this.setData({
			isCarBoard: this.data.isCarBoard,
			carNumStr: this.data.carNumStr,
			abc: this.data.abc
		})
	},
	// 车牌号选择
	carValue(e) {
		let value = e.detail
		if (this.data.carNumStr.length < this.data.carBoxNum) {
			this.data.carNumStr.push(value)
		}
		if (this.data.carNumStr.length > 0) {
			this.data.abc = true
		}
		this.setData({
			carNumStr: this.data.carNumStr,
			abc: this.data.abc
		})
	},
	// 切换车牌
	changeCarType(e) {
		if (this.data.carType == 1) {
			this.data.carType = 2
			this.data.carBoxNum = 8
		} else {
			this.data.carType = 1
			this.data.carBoxNum = 7
			if (this.data.carNumStr && this.data.carNumStr.length == 8) {
				this.data.carNumStr.pop();
			}
		}
		this.setData({
			carType: this.data.carType,
			carBoxNum: this.data.carBoxNum,
			carNumStr: this.data.carNumStr
		})
	}
})