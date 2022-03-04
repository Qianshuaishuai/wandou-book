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
    expressArrivalAddress: "",
    expressTime: "",
    expressAsk: "",
    expressContract: "",
    expressNote: "",
    expressPrice: 0.0,
    expressPayPrice: 0.0,

    currentPayPriceTip: "",

    school: {},
    userInfo: {}
  },

  changeType(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentTypeindex: index
    })
  },

  changeSize(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentSizeIndex: index
    })

    var currentSizeIndex = this.data.currentSizeIndex
    var value = this.data.expressPrice

    if (value <= 0) {
      return
    }
    var currentPayPriceTip = "(费用包含小件寄件费用2元)"
    var addPrice = 0
    switch (currentSizeIndex) {
      case 0:
        addPrice = 2
        currentPayPriceTip = "(费用包含小件寄件费用2元)"
        break
      case 1:
        addPrice = 3
        currentPayPriceTip = "(费用包含中件寄件费用3元)"
        break
      case 2:
        addPrice = 5
        currentPayPriceTip = "(费用包含大件寄件费用5元)"
        break
      default:
        addPrice = 2
        currentPayPriceTip = "(费用包含小件寄件费用2元)"
        break
    }
    var newPrice = value + addPrice
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
    var typeIndex = this.data.currentTypeindex
    var payCount = -1
    switch (typeIndex) {
      case 0:
        if (this.data.expressAsk == '') {
          wx.showToast({
            title: '请输入跑腿需求',
            icon: 'none'
          })
          return
        }

        if (this.data.expressAddress == '') {
          wx.showToast({
            title: '请输入代拿地点',
            icon: 'none'
          })
          return
        }


        if (this.data.expressTime == '') {
          wx.showToast({
            title: '请输入送达时间',
            icon: 'none'
          })
          return
        }


        if (this.data.expressArrivalAddress == '') {
          wx.showToast({
            title: '请填写送货位置',
            icon: 'none'
          })
          return
        }


        if (this.data.expressPrice <= 0) {
          wx.showToast({
            title: '请输入金额',
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


        if (this.data.agentPrice <= 0) {
          wx.showToast({
            title: '请填写代购价格',
            icon: 'none'
          })
          return
        }

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

        if (this.data.rewardTaskCount == '') {
          wx.showToast({
            title: '请输入任务数量',
            icon: 'none'
          })
          return
        }

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

    wx.request({
      url: app.globalData.baseUrl + '/v1/errand/before/pay',
      data: {
        wx_id: wx.getStorageSync("userId"),
        count: 1,
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
              "expressArrivalAddress": this.data.expressArrivalAddress,
              "expressTime": this.data.expressTime,
              "expressAsk": this.data.expressAsk,
              "expressContract": this.data.expressContract,
              "expressNote": this.data.expressNote,
              "expressPrice": this.data.expressPrice,
              "expressPayPrice": this.data.expressPayPrice,
              "expressSize": this.data.sizeList[this.data.currentSizeIndex].id,
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
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
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

    var cost = this.data.school.errandCost
    var currentPayPriceTip = "费用包含跑腿费用" + cost + "元"
    var newPrice = value + cost
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
      absentPayPrice: newPrice,
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
      otherPayPrice: newPrice,
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
      leasePayPrice: newPrice,
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
      playPayPrice: newPrice,
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
      rewardPayPrice: newPrice,
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
    var addPrice = 0
    var currentPayPriceTip = "(费用包含小件寄件费用2元)"
    switch (currentSizeIndex) {
      case 0:
        addPrice = 2
        currentPayPriceTip = "(费用包含小件寄件费用2元)"
        break
      case 1:
        addPrice = 3
        currentPayPriceTip = "(费用包含中件寄件费用3元)"
        break
      case 2:
        addPrice = 5
        currentPayPriceTip = "(费用包含大件寄件费用5元)"
        break
      default:
        addPrice = 2
        currentPayPriceTip = "(费用包含小件寄件费用2元)"
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