// pages/newerrand/newerrand.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    testList: ["a", "a", "a", "a", "a"],
    currentTypeindex: 0,
    currentSizeIndex: 0,
    currentTimeIndex: 0,
    currentCount: 0,
    currentNeed: "",
    currentDate: "",
    currentTakeAddress: "",
    currentSendAddress: "",
    sizeList: [{
        name: "小件",
        id: 1
      },
      {
        name: "中件",
        id: 2
      },
      {
        name: "大件",
        id: 3
      }
    ],
    timeList: [{
        name: "今天上午",
        id: 1
      },
      {
        name: "今天中午",
        id: 2
      },
      {
        name: "今天下午",
        id: 3
      }
    ],
    typeList: [{
      "id": 7,
      "name": "快递"
    }, {
      "id": 1,
      "name": "美食代购"
    }, {
      "id": 2,
      "name": "代课"
    }, {
      "id": 3,
      "name": "其他跑腿"
    }, {
      "id": 4,
      "name": "租赁"
    }, {
      "id": 5,
      "name": "陪玩"
    }, {
      "id": 6,
      "name": "悬赏"
    }],
    // 美食代购
    agentReceiveAddress: "",
    agentStoreAddress: "",
    agentArrivalTime: "",
    agent: "",
    agentPrice: 0.0,
    agentCost: 0.0,
    agentContract: "",
    agentNote: "",
    agentPayPrice: 0.0,
    // 代课
    absentTime: "",
    absentDate: "",
    absentAddress: "",
    absentAsk: "",
    absentContract: "",
    absentNote: "",
    absentPrice: 0.0,
    absentPayPrice: 0.0,
    // 其他跑腿
    otherReceiveAddress: "",
    otherErrandAddress: "",
    otherArrivalTime: "",
    otherAsk: "",
    otherErrandPrice: 0.0,
    otherContract: "",
    otherNote: "",
    otherPayPrice: 0.0,
    // 租赁
    leaseThing: "",
    leaseTime: "",
    leasePrice: 0.0,
    leaseContract: "",
    leaseNote: "",
    leasePayPrice: 0.0,

    // 陪玩
    playGame: "",
    playTarget: "",
    playPrice: 0.0,
    playContract: "",
    playNote: "",
    playPayPrice: 0.0,

    // 悬赏
    rewardTask: "",
    rewardTaskCount: 0,
    rewardPrice: 0.0,
    rewardContract: "",
    rewardNote: "",
    rewardPayPrice: 0.0,

    // 快递
    expressAddress: "",
    expressStore: "",
    expressOrder: "",
    expressArrivalAddress: "",
    expressReward: 0,
    expressCount: 0,
    expressTime: "",
    expressAsk: "",
    expressThing: "",
    expressContract: "",
    expressReceiveName: "",
    expressNote: "",
    expressPrice: 0.0,
    expressPayPrice: 0.0,

    currentPayPriceTip: "",

    school: {},
    userInfo: {},

    currentPhotos: [],
    qiniuToken: "",

    showUnbindDialog: false,
    rewardSwitch: 0,
  },

  closeDialog() {
    this.setData({
      showUnbindDialog: false
    })
  },

  changeSwitch() {
    this.setData({
      rewardSwitch: this.data.rewardSwitch == 1 ? 0 : 1
    })

    var currentSizeIndex = this.data.currentSizeIndex
    var reward = this.data.expressReward

    var school = this.data.school

    // if (value <= 0) {
    //   return
    // }
    var currentPayPriceTip = "(费用包含小件寄件费用2元)"
    var addPrice = 0
    switch (currentSizeIndex) {
      case 0:
        addPrice = school.expressSmallCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressSmallCost + "元)"
        break
      case 1:
        addPrice = school.expressMiddleCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressMiddleCost + "元)"
        break
      case 2:
        addPrice = school.expressLargeCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressLargeCost + "元)"
        break
      default:
        addPrice = school.expressSmallCount
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressSmallCount + "元)"
        break
    }
    var newPrice = addPrice
    if (this.data.rewardSwitch == 1) {
      newPrice = addPrice + reward
    } else {
      newPrice = addPrice
    }

    this.setData({
      expressPayPrice: newPrice,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  showDialog() {
    this.setData({
      showUnbindDialog: true
    })
  },

  changeType(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentTypeindex: index
    })
  },

  changeTime(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentTimeIndex: index
    })
  },

  changeSize(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentSizeIndex: index
    })

    var currentSizeIndex = this.data.currentSizeIndex
    var reward = this.data.expressReward

    var school = this.data.school

    // if (value <= 0) {
    //   return
    // }
    var currentPayPriceTip = "(费用包含小件寄件费用2元)"
    var addPrice = 0
    switch (currentSizeIndex) {
      case 0:
        addPrice = school.expressSmallCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressSmallCost + "元)"
        break
      case 1:
        addPrice = school.expressMiddleCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressMiddleCost + "元)"
        break
      case 2:
        addPrice = school.expressLargeCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressLargeCost + "元)"
        break
      default:
        addPrice = school.expressSmallCount
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressSmallCount + "元)"
        break
    }
    var newPrice = addPrice
    if (this.data.rewardSwitch == 1) {
      newPrice = addPrice + reward
    } else {
      newPrice = addPrice
    }

    this.setData({
      expressPayPrice: newPrice,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  changeCount(event) {
    var value = Number(event.detail.value)
    this.setData({
      currentCount: value
    })
  },

  changeDate(event) {
    var date = Number(event.detail.value)
    this.setData({
      currentDate: value
    })
  },

  changeNeed(event) {
    var value = event.detail.value
    this.setData({
      currentNeed: value
    })
  },

  changeTakeAddress(event) {
    var value = event.detail.value
    this.setData({
      currentTakeAddress: value
    })
  },

  changeSendAddress(event) {
    var value = event.detail.value
    this.setData({
      currentSendAddress: value
    })
  },

  bindPickerDateChange(event) {
    console.log(event)
  },

  release() {
    if (this.data.school.isBind == 0) {
      wx.showToast({
        title: '当前学校没有站长入驻，暂不能发布',
        icon: 'none'
      })
      return
    }

    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '/pages/masterregister/masterregister',
        })
      }, 500);
      return
    }

    var typeIndex = this.data.currentTypeindex
    var payCount = -1
    switch (typeIndex) {
      case 0:
        // if (this.data.expressAsk == '') {
        //   wx.showToast({
        //     title: '请输入跑腿需求',
        //     icon: 'none'
        //   })
        //   return
        // }



        if (this.data.expressAddress == '') {
          wx.showToast({
            title: '请输入收件地址',
            icon: 'none'
          })
          return
        }

        if (this.data.expressThing == '') {
          wx.showToast({
            title: '请输入快递内务物',
            icon: 'none'
          })
          return
        }


        // if (this.data.expressTime == '') {
        //   wx.showToast({
        //     title: '请输入送达时间',
        //     icon: 'none'
        //   })
        //   return
        // }


        if (this.data.expressArrivalAddress == '') {
          wx.showToast({
            title: '请填写代拿地点',
            icon: 'none'
          })
          return
        }

        if (this.data.expressContract == '') {
          wx.showToast({
            title: '请输入联系方式',
            icon: 'none'
          })
          return
        }

        if (this.data.expressNote == '') {
          wx.showToast({
            title: '请输入备注',
            icon: 'none'
          })
          return
        }

        // if (this.data.expressCount == 0) {
        //   wx.showToast({
        //     title: '请输入快递数量',
        //     icon: 'none'
        //   })
        //   return
        // }

        if (this.data.expressStore == '') {
          wx.showToast({
            title: '请输入快递商家',
            icon: 'none'
          })
          return
        }

        if (this.data.expressOrder == '') {
          wx.showToast({
            title: '请输入快递单号',
            icon: 'none'
          })
          return
        }

        if (this.data.currentPhotos.length <= 0) {
          wx.showToast({
            title: '请上传取件信息',
            icon: 'none'
          })
          return
        }

        if (this.data.expressReceiveName == '') {
          wx.showToast({
            title: '请输入快递收件人姓名',
            icon: 'none'
          })
          return
        }

        if (this.data.rewardSwitch == 1 && this.data.expressReward <= 0) {
          wx.showToast({
            title: '请输入加急悬赏金额',
            icon: 'none'
          })
          return
        }

        if (this.data.expressPayPrice <= 0) {
          wx.showToast({
            title: '请填写支付金额',
            icon: 'none'
          })
          return
        }
        payCount = this.data.expressPayPrice
        break
      case 1:
        if (this.data.agentReceiveAddress == '') {
          wx.showToast({
            title: '请填写收货地址',
            icon: 'none'
          })
          return
        }

        if (this.data.agentStoreAddress == '') {
          wx.showToast({
            title: '请填写商家地址',
            icon: 'none'
          })
          return
        }


        if (this.data.agentArrivalTime == '') {
          wx.showToast({
            title: '请填写送达时间',
            icon: 'none'
          })
          return
        }


        if (this.data.agent == '') {
          wx.showToast({
            title: '请填写代购商品',
            icon: 'none'
          })
          return
        }


        if (this.data.agentReceiveAddress == '') {
          wx.showToast({
            title: '请填写收货地址',
            icon: 'none'
          })
          return
        }


        // if (this.data.agentPrice <= 0) {
        //   wx.showToast({
        //     title: '请填写代购价格',
        //     icon: 'none'
        //   })
        //   return
        // }

        if (this.data.agentCost <= 0) {
          wx.showToast({
            title: '请填写代购费',
            icon: 'none'
          })
          return
        }

        if (this.data.agentContract == '') {
          wx.showToast({
            title: '请填写联系方式',
            icon: 'none'
          })
          return
        }

        if (this.data.agentNote == '') {
          wx.showToast({
            title: '请填写备注',
            icon: 'none'
          })
          return
        }

        if (this.data.agentPayPrice <= 0) {
          wx.showToast({
            title: '请填写支付金额',
            icon: 'none'
          })
          return
        }
        payCount = this.data.agentPayPrice
        break
      case 2:
        if (this.data.absentTime == '') {
          wx.showToast({
            title: '请输入代课日期',
            icon: 'none'
          })
          return
        }
        if (this.data.absentDate == '') {
          wx.showToast({
            title: '请输入代课时间',
            icon: 'none'
          })
          return
        }
        if (this.data.absentAddress == '') {
          wx.showToast({
            title: '请输入代课地点',
            icon: 'none'
          })
          return
        }
        if (this.data.absentPrice <= 0) {
          wx.showToast({
            title: '请填写代课费用',
            icon: 'none'
          })
          return
        }
        if (this.data.absentAsk == '') {
          wx.showToast({
            title: '请输入代课要求',
            icon: 'none'
          })
          return
        }

        if (this.data.absentAsk == '') {
          wx.showToast({
            title: '请输入联系方式',
            icon: 'none'
          })
          return
        }

        if (this.data.absentAsk == '') {
          wx.showToast({
            title: '请输入备注',
            icon: 'none'
          })
          return
        }
        if (this.data.absentPayPrice <= 0) {
          wx.showToast({
            title: '请输入支付金额',
            icon: 'none'
          })
          return
        }
        payCount = this.data.absentPayPrice
        break
      case 3:
        if (this.data.otherReceiveAddress == '') {
          wx.showToast({
            title: '请输入收货地址',
            icon: 'none'
          })
          return
        }
        if (this.data.otherErrandAddress == '') {
          wx.showToast({
            title: '请输入跑腿地址',
            icon: 'none'
          })
          return
        }
        if (this.data.otherArrivalTime == '') {
          wx.showToast({
            title: '请输入送达时间',
            icon: 'none'
          })
          return
        }
        if (this.data.otherErrandAsk == '') {
          wx.showToast({
            title: '请填写跑腿要求',
            icon: 'none'
          })
          return
        }
        if (this.data.otherErrandPrice <= 0.0) {
          wx.showToast({
            title: '请输入跑腿费用',
            icon: 'none'
          })
          return
        }
        if (this.data.otherContract == '') {
          wx.showToast({
            title: '请输入联系方式',
            icon: 'none'
          })
          return
        }
        if (this.data.otherNote == '') {
          wx.showToast({
            title: '请输入备注',
            icon: 'none'
          })
          return
        }
        if (this.data.otherPayPrice <= 0.0) {
          wx.showToast({
            title: '请输入支付金额',
            icon: 'none'
          })
          return
        }
        payCount = this.data.otherPayPrice
        break
      case 4:
        if (this.data.leaseThing == '') {
          wx.showToast({
            title: '请输入物品',
            icon: 'none'
          })
          return
        }

        if (this.data.leaseTime == '') {
          wx.showToast({
            title: '请输入时长',
            icon: 'none'
          })
          return
        }

        if (this.data.leasePrice <= 0.0) {
          wx.showToast({
            title: '请填写金额',
            icon: 'none'
          })
          return
        }

        if (this.data.leaseContract == '') {
          wx.showToast({
            title: '请输入联系方式',
            icon: 'none'
          })
          return
        }

        if (this.data.leaseNote == '') {
          wx.showToast({
            title: '请输入备注',
            icon: 'none'
          })
          return
        }

        if (this.data.leasePayPrice <= 0.0) {
          wx.showToast({
            title: '请输入支付金额',
            icon: 'none'
          })
          return
        }
        payCount = this.data.leasePayPrice
        break
      case 5:
        if (this.data.playGame == '') {
          wx.showToast({
            title: '请输入游戏',
            icon: 'none'
          })
          return
        }

        if (this.data.playTarget == '') {
          wx.showToast({
            title: '请输入目标',
            icon: 'none'
          })
          return
        }

        if (this.data.playPrice <= 0.0) {
          wx.showToast({
            title: '请填写金额',
            icon: 'none'
          })
          return
        }

        if (this.data.playContract == '') {
          wx.showToast({
            title: '请输入联系方式',
            icon: 'none'
          })
          return
        }

        if (this.data.playNote == '') {
          wx.showToast({
            title: '请输入备注',
            icon: 'none'
          })
          return
        }

        if (this.data.playPayPrice <= 0.0) {
          wx.showToast({
            title: '请输入支付金额',
            icon: 'none'
          })
          return
        }
        payCount = this.data.playPayPrice
        break
      case 6:
        if (this.data.rewardTask == '') {
          wx.showToast({
            title: '请输入任务',
            icon: 'none'
          })
          return
        }

        // if (this.data.rewardTaskCount == '') {
        //   wx.showToast({
        //     title: '请输入任务数量',
        //     icon: 'none'
        //   })
        //   return
        // }

        if (this.data.rewardPrice <= 0.0) {
          wx.showToast({
            title: '请填写金额',
            icon: 'none'
          })
          return
        }

        if (this.data.rewardContract == '') {
          wx.showToast({
            title: '请输入联系方式',
            icon: 'none'
          })
          return
        }

        if (this.data.rewardNote == '') {
          wx.showToast({
            title: '请输入备注',
            icon: 'none'
          })
          return
        }

        if (this.data.rewardPayPrice <= 0.0) {
          wx.showToast({
            title: '请输入支付金额',
            icon: 'none'
          })
          return
        }
        payCount = this.data.rewardPayPrice
        break
    }

    if (payCount <= 1) {
      wx.showToast({
        title: '支付金额最低1元',
        icon: 'none'
      })
      return
    }

    var balance = this.data.userInfo.errandBalance

    if (payCount <= balance) {
      wx.request({
        url: app.globalData.baseUrl + '/v1/errand/balance/pay',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          phone: this.data.userInfo.phone,
          count: payCount,
        },
        success: res => {
          if (res.data.F_responseNo != 10000) {
            wx.showToast({
              title: '账户余额不足以支付',
              icon: 'none'
            })
            return
          }

          var orderId = res.data.F_data
          wx.showLoading({
            title: '正在发布中...',
          })
          var createData = {
            "id": orderId,
            "realPayCount": payCount,
            "phone": this.data.userInfo.phone,
            "school_id": this.data.school.id,
            "type": this.data.typeList[this.data.currentTypeindex].id,
            "agentReceiveAddress": this.data.agentReceiveAddress,
            "agentStoreAddress": this.data.agentStoreAddress,
            "agentArrivalTime": this.data.agentArrivalTime,
            "agent": this.data.agent,
            "agentPrice": this.data.agentPrice,
            "agentCost": this.data.agentCost,
            "agentContract": this.data.agentContract,
            "agentNote": this.data.agentNote,
            "agentPayPrice": this.data.agentPayPrice,
            "absentTime": this.data.absentTime,
            "absentDate": this.data.absentDate,
            "absentAddress": this.data.absentAddress,
            "absentAsk": this.data.absentAsk,
            "absentContract": this.data.absentContract,
            "absentNote": this.data.absentNote,
            "absentPrice": this.data.absentPrice,
            "absentPayPrice": this.data.absentPayPrice,
            "otherReceiveAddress": this.data.otherReceiveAddress,
            "otherErrandAddress": this.data.otherErrandAddress,
            "otherArrivalTime": this.data.otherArrivalTime,
            "otherAsk": this.data.otherAsk,
            "otherErrandPrice": this.data.otherErrandPrice,
            "otherContract": this.data.otherContract,
            "otherNote": this.data.otherNote,
            "otherPayPrice": this.data.otherPayPrice,
            "leaseThing": this.data.leaseThing,
            "leaseTime": this.data.leaseTime,
            "leasePrice": this.data.leasePrice,
            "leaseContract": this.data.leaseContract,
            "leaseNote": this.data.leaseNote,
            "leasePayPrice": this.data.leasePayPrice,
            "playGame": this.data.playGame,
            "playTarget": this.data.playTarget,
            "playPrice": this.data.playPrice,
            "playContract": this.data.playContract,
            "playNote": this.data.playNote,
            "playPayPrice": this.data.playPayPrice,
            "rewardTask": this.data.rewardTask,
            "rewardTaskCount": this.data.rewardTaskCount,
            "rewardPrice": this.data.rewardPrice,
            "rewardContract": this.data.rewardContract,
            "rewardNote": this.data.rewardNote,
            "rewardPayPrice": this.data.rewardPayPrice,
            "expressAddress": this.data.expressAddress,
            "expressStore": this.data.expressStore,
            "expressOrder": this.data.expressOrder,
            "expressPhotos": JSON.stringify(this.data.currentPhotos),
            "expressContract": this.data.expressContract,
            "expressNote": this.data.expressNote,
            "expressReceiveName": this.data.expressReceiveName,
            "expressPayPrice": this.data.expressPayPrice,
            "expressSize": this.data.sizeList[this.data.currentSizeIndex].id,
            "expressTime": this.data.timeList[this.data.currentTimeIndex].id,
            "expressArrivalAddress": this.data.expressArrivalAddress,
            "expressThing": this.data.expressThing,
            "rewardSwitch": this.data.rewardSwitch
          }

          wx.request({
            url: app.globalData.baseUrl + '/v1/errand/create',
            data: createData,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              console.log(res)
              wx.hideLoading()
              wx.showToast({
                title: '创建成功',
                icon: 'none'
              })
              setTimeout(function() {
                wx.navigateBack({
                  delta: 1
                })
              }, 500);
            },
            fail: res => {
              console.log(res)
              wx.hideLoading()
            }
          })

        },
        fail: res => {
          wx.showToast({
            title: '支付失败，请联系管理员',
            icon: 'none'
          })
        },
      })
    } else {
      wx.request({
        url: app.globalData.baseUrl + '/v1/errand/before/pay',
        data: {
          wx_id: wx.getStorageSync("userId"),
          count: payCount * 100,
        },
        success: res => {
          if (res.data.F_responseNo != 10000) {
            wx.showToast({
              title: '支付失败,请联系管理员',
              icon: 'none'
            })
            return
          }
          var orderId = res.data.F_data.orderID
          wx.requestPayment({
            timeStamp: res.data.F_data.timestamp,
            nonceStr: res.data.F_data.nonceStr,
            package: res.data.F_data.package,
            signType: res.data.F_data.signType,
            paySign: res.data.F_data.paySign,
            success: res => {
              wx.showLoading({
                title: '正在发布中...',
              })
              var createData = {
                "id": orderId,
                "realPayCount": payCount,
                "phone": this.data.userInfo.phone,
                "school_id": this.data.school.id,
                "type": this.data.typeList[this.data.currentTypeindex].id,
                "agentReceiveAddress": this.data.agentReceiveAddress,
                "agentStoreAddress": this.data.agentStoreAddress,
                "agentArrivalTime": this.data.agentArrivalTime,
                "agent": this.data.agent,
                "agentPrice": this.data.agentPrice,
                "agentCost": this.data.agentCost,
                "agentContract": this.data.agentContract,
                "agentNote": this.data.agentNote,
                "agentPayPrice": this.data.agentPayPrice,
                "absentTime": this.data.absentTime,
                "absentDate": this.data.absentDate,
                "absentAddress": this.data.absentAddress,
                "absentAsk": this.data.absentAsk,
                "absentContract": this.data.absentContract,
                "absentNote": this.data.absentNote,
                "absentPrice": this.data.absentPrice,
                "absentPayPrice": this.data.absentPayPrice,
                "otherReceiveAddress": this.data.otherReceiveAddress,
                "otherErrandAddress": this.data.otherErrandAddress,
                "otherArrivalTime": this.data.otherArrivalTime,
                "otherAsk": this.data.otherAsk,
                "otherErrandPrice": this.data.otherErrandPrice,
                "otherContract": this.data.otherContract,
                "otherNote": this.data.otherNote,
                "otherPayPrice": this.data.otherPayPrice,
                "leaseThing": this.data.leaseThing,
                "leaseTime": this.data.leaseTime,
                "leasePrice": this.data.leasePrice,
                "leaseContract": this.data.leaseContract,
                "leaseNote": this.data.leaseNote,
                "leasePayPrice": this.data.leasePayPrice,
                "playGame": this.data.playGame,
                "playTarget": this.data.playTarget,
                "playPrice": this.data.playPrice,
                "playContract": this.data.playContract,
                "playNote": this.data.playNote,
                "playPayPrice": this.data.playPayPrice,
                "rewardTask": this.data.rewardTask,
                "rewardTaskCount": this.data.rewardTaskCount,
                "rewardPrice": this.data.rewardPrice,
                "rewardContract": this.data.rewardContract,
                "rewardNote": this.data.rewardNote,
                "rewardPayPrice": this.data.rewardPayPrice,
                "expressAddress": this.data.expressAddress,
                "expressStore": this.data.expressStore,
                "expressOrder": this.data.expressOrder,
                "expressPhotos": JSON.stringify(this.data.currentPhotos),
                "expressContract": this.data.expressContract,
                "expressNote": this.data.expressNote,
                "expressReceiveName": this.data.expressReceiveName,
                "expressPayPrice": this.data.expressPayPrice,
                "expressSize": this.data.sizeList[this.data.currentSizeIndex].id,
                "expressTime": this.data.timeList[this.data.currentTimeIndex].id,
                "expressArrivalAddress": this.data.expressArrivalAddress,
                "expressThing": this.data.expressThing,
                "rewardSwitch": this.data.rewardSwitch
              }

              wx.request({
                url: app.globalData.baseUrl + '/v1/errand/create',
                data: createData,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: res => {
                  console.log(res)
                  wx.hideLoading()
                  wx.showToast({
                    title: '创建成功',
                    icon: 'none'
                  })
                  setTimeout(function() {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 500);
                },
                fail: res => {
                  console.log(res)
                  wx.hideLoading()
                }
              })
            },
            fail: res => {
              wx.showToast({
                title: '您已取消支付',
                icon: 'none'
              })
              return
            }
          })
        },
      })
    }



  },

  addPhoto() {
    var token = this.data.qiniuToken
    if (token == "") {
      wx.showToast({
        title: '获取上传图片资格失败，请联系管理员',
        icon: 'none'
      })
      return
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        var currentPhotos = this.data.currentPhotos
        if (tempFilePaths.length > 0) {
          // currentPhotos.push(tempFilePaths[0])
          // this.setData({
          //   currentPhotos: currentPhotos
          // })
          this.uploadPhoto(tempFilePaths[0], token)
        }
      }
    })
  },

  uploadPhoto(img, token) {
    var newFileName = "secondhand-photo-" + Date.parse(new Date()) + ".png"
    wx.uploadFile({
      url: 'https://up-z2.qiniup.com', //分华北区，华东区之类的，大家自己注意下
      name: 'file',
      filePath: img,
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        token: token,
        key: newFileName
      },
      success: res => {
        let data = JSON.parse(res.data);
        var url = "https://resource.qimsj.com/" + data.key
        var currentPhotos = this.data.currentPhotos
        currentPhotos.push(url)
        this.setData({
          currentPhotos: currentPhotos
        })
      },

      fail: res => {
        wx.showToast({
          title: '上传图片失败，联系管理员',
          icon: 'none'
        })
      }
    });
  },

  deletePhoto(event) {
    var index = Number(event.currentTarget.dataset.index)
    var photoList = this.data.currentPhotos
    photoList.splice(index, 1)
    this.setData({
      currentPhotos: photoList
    })
  },

  getQiniuToken() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/qiniu/token',
      success: res => {
        this.setData({
          qiniuToken: res.data.F_data
        })
      },
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getQiniuToken()
    var school = wx.getStorageSync('school')
    if (school == undefined || school.id == undefined || school.id == 0) {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
      return
    }

    this.setData({
      school: school
    })

    var school = this.data.school
    this.getPickSchool()
    // if (value <= 0) {
    //   return
    // }
  },

  getPickSchool() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/pick/show',
      data: {
        id: this.data.school.id
      },
      method: 'GET',
      success: res => {
        this.setData({
          school: res.data.F_data
        })

        var currentSizeIndex = this.data.currentSizeIndex
        var addPrice = 0
        var school = this.data.school
        switch (currentSizeIndex) {
          case 0:
            addPrice = school.expressSmallCost
            break
          case 1:
            addPrice = school.expressMiddleCost
            break
          case 2:
            addPrice = school.expressLargeCost
            break
          default:
            addPrice = school.expressSmallCount
            break
        }
        var newPrice = addPrice
        if (this.data.rewardSwitch == 1) {
          newPrice = addPrice + reward
        } else {
          newPrice = addPrice
        }
        this.setData({
          expressPayPrice: newPrice,
        })

        if (this.data.school.id == 0) {
          wx.showToast({
            title: '获取当前学校快递费用失败',
            icon: 'none'
          })

          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        }
      },
      failed: res => {
        wx.showToast({
          title: '获取当前学校快递费用失败',
          icon: 'none'
        })

        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 1000);
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })

    if (userInfo.phone == '') {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 500);
    }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  // 美食代购
  changeAgentReceiveAddress(event) {
    var value = event.detail.value
    this.setData({
      agentReceiveAddress: value
    })
  },

  changeAgentStoreAddress(event) {
    var value = event.detail.value
    this.setData({
      agentStoreAddress: value
    })
  },

  changeAgentArrivalTime(event) {
    var value = event.detail.value
    this.setData({
      agentArrivalTime: value
    })
  },

  changeAgent(event) {
    var value = event.detail.value
    this.setData({
      agent: value
    })
  },

  changeAgentPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      agentPrice: value
    })

    if (value <= 0) {
      this.setData({
        agentPayPrice: 0
      })
      return
    }

    var cost = this.data.agentCost
    var currentPayPriceTip = "费用包含跑腿费用" + cost + "元"
    var newPrice = value + cost
    console.log(newPrice)
    this.setData({
      agentPayPrice: newPrice,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  changeAgentCost(event) {
    var value = Number(event.detail.value)
    this.setData({
      agentCost: value
    })

    if (value <= 0) {
      this.setData({
        agentPayPrice: 0
      })
      return
    }

    var cost = this.data.agentPrice
    var currentPayPriceTip = "费用包含跑腿费用" + cost + "元"
    var newPrice = value
    this.setData({
      agentPayPrice: newPrice,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  changeAgentContract(event) {
    var value = event.detail.value
    this.setData({
      agentContract: value
    })
  },

  changeAgentNote(event) {
    var value = event.detail.value
    this.setData({
      agentNote: value
    })
  },

  changeAgentPayPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      agentPayPrice: value
    })
  },

  //代课
  changeAbsentTime(event) {
    var value = event.detail.value
    this.setData({
      absentTime: value
    })
  },
  changeAbsentDate(event) {
    var value = event.detail.value
    this.setData({
      absentDate: value
    })
  },
  changeAbsentAddress(event) {
    var value = event.detail.value
    this.setData({
      absentAddress: value
    })
  },
  changeAbsentPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      absentPrice: value
    })

    if (value <= 0) {
      this.setData({
        absentPayPrice: 0
      })
      return
    }

    var cost = this.data.school.errandCost
    var currentPayPriceTip = "费用包含跑腿费用" + cost + "元"
    var newPrice = value + cost
    this.setData({
      absentPayPrice: value,
      currentPayPriceTip: currentPayPriceTip
    })
  },
  changeAbsentAsk(event) {
    var value = event.detail.value
    this.setData({
      absentAsk: value
    })
  },
  changeAbsentContract(event) {
    var value = event.detail.value
    this.setData({
      absentContract: value
    })
  },
  changeAbsentNote(event) {
    var value = event.detail.value
    this.setData({
      absentNote: value
    })
  },
  changeAbsentPayPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      absentPayPrice: value
    })
  },

  // 其他跑腿
  changeOtherReceiveAddress(event) {
    var value = event.detail.value
    this.setData({
      otherReceiveAddress: value
    })
  },

  changeOtherErrandAddress(event) {
    var value = event.detail.value
    this.setData({
      otherErrandAddress: value
    })
  },

  changeOtherArrivalTime(event) {
    var value = event.detail.value
    this.setData({
      otherArrivalTime: value
    })
  },

  changeOtherErrandAsk(event) {
    var value = event.detail.value
    this.setData({
      otherErrandAsk: value
    })
  },

  changeOtherErrandPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      otherErrandPrice: value
    })

    if (value <= 0) {
      this.setData({
        otherPayPrice: 0
      })
      return
    }

    var cost = this.data.school.errandCost
    var currentPayPriceTip = "费用包含跑腿费用" + cost + "元"
    var newPrice = value + cost
    this.setData({
      otherPayPrice: value,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  changeOtherContract(event) {
    var value = event.detail.value
    this.setData({
      otherContract: value
    })
  },

  changeOtherNote(event) {
    var value = event.detail.value
    this.setData({
      otherNote: value
    })
  },

  changeOtherPayPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      otherPayPrice: value
    })
  },

  //租赁
  changeLeaseThing(event) {
    var value = event.detail.value
    this.setData({
      leaseThing: value
    })
  },

  changeLeaseTime(event) {
    var value = event.detail.value
    this.setData({
      leaseTime: value
    })
  },

  changeLeasePrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      leasePrice: value
    })

    if (value <= 0) {
      this.setData({
        leasePayPrice: 0
      })
      return
    }

    var cost = this.data.school.errandCost
    var currentPayPriceTip = "费用包含跑腿费用" + cost + "元"
    var newPrice = value + cost
    this.setData({
      leasePayPrice: value,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  changeLeaseNote(event) {
    var value = event.detail.value
    this.setData({
      leaseNote: value
    })
  },

  changeLeaseContract(event) {
    var value = event.detail.value
    this.setData({
      leaseContract: value
    })
  },

  changeLeasePayPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      leasePayPrice: value
    })
  },

  //陪玩
  changePlayGame(event) {
    var value = event.detail.value
    this.setData({
      playGame: value
    })
  },

  changePlayTarget(event) {
    var value = event.detail.value
    this.setData({
      playTarget: value
    })
  },

  changePlayPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      playPrice: value
    })

    if (value <= 0) {
      this.setData({
        playPayPrice: 0
      })
      return
    }

    var cost = this.data.school.errandCost
    var currentPayPriceTip = "费用包含跑腿费用" + cost + "元"
    var newPrice = value + cost
    this.setData({
      playPayPrice: value,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  changePlayNote(event) {
    var value = event.detail.value
    this.setData({
      playNote: value
    })
  },

  changePlayContract(event) {
    var value = event.detail.value
    this.setData({
      playContract: value
    })
  },

  changePlayPayPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      playPayPrice: value
    })
  },

  //陪玩
  changeRewardTask(event) {
    var value = event.detail.value
    this.setData({
      rewardTask: value
    })
  },

  changeRewardTaskCount(event) {
    var value = Number(event.detail.value)
    this.setData({
      rewardTaskCount: value
    })
  },

  changeRewardPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      rewardPrice: value
    })

    if (value <= 0) {
      this.setData({
        rewardPayPrice: 0
      })
      return
    }

    var cost = this.data.school.errandCost
    var currentPayPriceTip = "费用包含跑腿费用" + cost + "元"
    var newPrice = value + cost
    this.setData({
      rewardPayPrice: value,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  changeRewardContract(event) {
    var value = event.detail.value
    this.setData({
      rewardContract: value
    })
  },

  changeRewardNote(event) {
    var value = event.detail.value
    this.setData({
      rewardNote: value
    })
  },

  changeRewardPayPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      rewardPayPrice: value
    })
  },

  //快递
  changeExpressAsk(event) {
    var value = event.detail.value
    this.setData({
      expressAsk: value
    })
  },

  changeExpressThing(event) {
    var value = event.detail.value
    this.setData({
      expressThing: value
    })
  },

  changeExpressAddress(event) {
    var value = event.detail.value
    this.setData({
      expressAddress: value
    })
  },

  changeExpressTime(event) {
    var value = event.detail.value
    this.setData({
      expressTime: value
    })
  },

  changeExpressContract(event) {
    var value = event.detail.value
    this.setData({
      expressContract: value
    })
  },

  changeExpressReceiveName(event) {
    var value = event.detail.value
    this.setData({
      expressReceiveName: value
    })
  },

  changeExpressNote(event) {
    var value = event.detail.value
    this.setData({
      expressNote: value
    })
  },

  changeExpressArrivalAddress(event) {
    var value = event.detail.value
    this.setData({
      expressArrivalAddress: value
    })
  },

  changeExpressCount(event) {
    var value = Number(event.detail.value)
    this.setData({
      expressCount: value
    })
  },

  changeExpressReward(event) {
    var value = Number(event.detail.value)
    this.setData({
      expressReward: value
    })

    var currentSizeIndex = this.data.currentSizeIndex
    var reward = this.data.expressReward

    var school = this.data.school

    // if (value <= 0) {
    //   return
    // }
    var currentPayPriceTip = "(费用包含小件寄件费用2元)"
    var addPrice = 0
    switch (currentSizeIndex) {
      case 0:
        addPrice = school.expressSmallCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressSmallCost + "元)"
        break
      case 1:
        addPrice = school.expressMiddleCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressMiddleCost + "元)"
        break
      case 2:
        addPrice = school.expressLargeCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressLargeCost + "元)"
        break
      default:
        addPrice = school.expressSmallCount
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressSmallCount + "元)"
        break
    }
    var newPrice = addPrice
    if (this.data.rewardSwitch == 1) {
      newPrice = addPrice + reward
    } else {
      newPrice = addPrice
    }

    this.setData({
      expressPayPrice: newPrice,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  changeExpressOrder(event) {
    var value = event.detail.value
    this.setData({
      expressOrder: value
    })
  },

  changeExpressStore(event) {
    var value = event.detail.value
    this.setData({
      expressStore: value
    })
  },

  changeExpressPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      expressPrice: value
    })

    if (value <= 0) {
      this.setData({
        expressPayPrice: 0
      })
      return
    }

    var currentSizeIndex = this.data.currentSizeIndex
    var value = this.data.expressPrice

    var school = this.data.school

    if (value <= 0) {
      return
    }
    var currentPayPriceTip = "(费用包含小件寄件费用X元)"
    var addPrice = 0
    switch (currentSizeIndex) {
      case 0:
        addPrice = school.expressSmallCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressSmallCost + "元)"
        break
      case 1:
        addPrice = school.expressMiddleCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressMiddleCost + "元)"
        break
      case 2:
        addPrice = school.expressLargeCost
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressLargeCost + "元)"
        break
      default:
        addPrice = school.expressSmallCount
        currentPayPriceTip = "(费用包含小件寄件费用" + school.expressSmallCount + "元)"
        break
    }
    var newPrice = value + addPrice
    this.setData({
      expressPayPrice: newPrice,
      currentPayPriceTip: currentPayPriceTip
    })
  },

  changeExpressPayPrice(event) {
    var value = Number(event.detail.value)
    this.setData({
      expressPayPrice: value
    })
  },
})