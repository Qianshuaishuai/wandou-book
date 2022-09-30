// pages/errandindex/errandindex.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    testList: ["", "", "", "", "", ""],
    showData: [],
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

    userInfo: {}
  },

  back() {
    wx.navigateBack({
      delta: 1
    })
  },

  showNotice(event) {
    wx.requestSubscribeMessage({
      tmplIds: ['ur-7dxigeVUPmNTzzIOfwfk5SGr4_LVX3R-6TRJehSw'],
      success(res) {
        wx.showModal({
          title: '提示',
          content: '授权成功,有最新消息会通知到您',
          showCancel: false,
        })
      }
    })
  },

  release() {
    wx.navigateTo({
      url: '/pages/errandlist/errandlist',
    })
  },

  take() {
    wx.navigateTo({
      url: '/pages/takeerrand/takeerrand',
    })
  },

  goToCert() {
    wx.navigateTo({
      url: '/pages/certrider/certrider',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    // var school = wx.getStorageSync('school')
    // if (school == undefined || school.id == undefined || school.id == 0) {
    //   wx.showToast({
    //     title: '请先选择学校',
    //     icon: 'none'
    //   })
    //   setTimeout(function() {
    //     wx.navigateBack({
    //       delta: 1
    //     })
    //   }, 1000);
    //   return
    // }

    // this.setData({
    //   school: school
    // })
    // this.getErrandList()
  },

  getErrandList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/errand/other/list',
      data: {
        phone: this.data.userInfo.phone,
        type: 0,
        school_id: this.data.school.id,
        sort: 0,
        status: 1
      },
      success: res => {
        var showData = res.data.F_data
        var typeList = this.data.typeList
        for (var s = 0; s < showData.length; s++) {
          for (var t = 0; t < typeList.length; t++) {
            if (showData[s].type == typeList[t].id) {
              showData[s].typeStr = typeList[t].name
            }
          }
        }

        this.translateShowData(showData)
      },
    })
  },

  translateShowData(showData) {
    var newShowData = new Array()
    for (var s = 0; s < showData.length; s++) {
      switch (showData[s].type) {
        case 1:
          showData[s].showPrice = showData[s].realPayCount
          showData[s].tip1 = "送达时间: " + showData[s].agentArrivalTime
          showData[s].tip2 = "备注: " + showData[s].agentNote
          showData[s].tag1 = "买"
          showData[s].tag2 = "送"
          showData[s].tag11 = showData[s].agent
          showData[s].tag22 = showData[s].agentReceiveAddress
          showData[s].tagC1 = "#FF3F38"
          showData[s].tagC2 = "#F8A028"
          showData[s].showContract = showData[s].agentContract
          showData[s].showNote = showData[s].agentNote
          newShowData.push(showData[s])
          break
        case 2:
          showData[s].showPrice = showData[s].absentPrice
          showData[s].tip1 = "代课日期: " + showData[s].absentDate
          showData[s].tip2 = "代课要求: " + showData[s].absentAsk
          showData[s].tag1 = "时间"
          showData[s].tag2 = "地点"
          showData[s].tag11 = showData[s].absentTime
          showData[s].tag22 = showData[s].absentAddress
          showData[s].tagC1 = "#0881F3"
          showData[s].tagC2 = "#F8A028"
          showData[s].showContract = showData[s].absentContract
          showData[s].showNote = showData[s].absentNote
          newShowData.push(showData[s])
          break
        case 3:
          showData[s].showPrice = showData[s].otherErrandPrice
          showData[s].tip1 = "送达时间: " + showData[s].otherArrivalTime
          showData[s].tip2 = "备注: " + showData[s].otherNote
          showData[s].tag1 = "收"
          showData[s].tag2 = "去"
          showData[s].tag11 = showData[s].otherReceiveAddress
          showData[s].tag22 = showData[s].otherErrandAddress
          showData[s].tagC1 = "#0881F3"
          showData[s].tagC2 = "#F8A028"
          showData[s].showContract = showData[s].otherContract
          showData[s].showNote = showData[s].otherNote
          newShowData.push(showData[s])
          break
        case 4:
          showData[s].showPrice = showData[s].leasePrice
          showData[s].tip1 = "备注: " + showData[s].leaseNote
          showData[s].tag1 = "物"
          showData[s].tag2 = "时"
          showData[s].tag11 = showData[s].leaseThing
          showData[s].tag22 = showData[s].leaseTime
          showData[s].tagC1 = "#FF3F38"
          showData[s].tagC2 = "#F8A028"
          showData[s].showContract = showData[s].leaseContract
          showData[s].showNote = showData[s].leaseNote
          newShowData.push(showData[s])
          break
        case 5:
          showData[s].showPrice = showData[s].playPrice
          showData[s].tip1 = "备注: " + showData[s].playNote
          showData[s].tag1 = "游戏"
          showData[s].tag2 = "目标"
          showData[s].tag11 = showData[s].playGame
          showData[s].tag22 = showData[s].playTarget
          showData[s].tagC1 = "#FF3F38"
          showData[s].tagC2 = "#F8A028"
          showData[s].showContract = showData[s].playContract
          showData[s].showNote = showData[s].playNote
          newShowData.push(showData[s])
          break
        case 6:
          showData[s].showPrice = showData[s].rewardPrice
          showData[s].tip1 = "备注: " + showData[s].rewardNote
          showData[s].tag1 = "任"
          showData[s].tag2 = "备"
          showData[s].tag11 = showData[s].rewardTask
          showData[s].tag22 = showData[s].rewardNote
          showData[s].tagC1 = "#FF3F38"
          showData[s].tagC2 = "#F8A028"
          showData[s].showContract = showData[s].rewardContract
          // showData[s].showNote = showData[s].rewardNote
          newShowData.push(showData[s])
          break
        case 7:
          showData[s].showPrice = showData[s].expressPayPrice
          showData[s].tip1 = "备注: " + showData[s].expressNote
          showData[s].tip2 = "快递内物: " + showData[s].expressThing
          showData[s].tag1 = "送达"
          showData[s].tag2 = "代拿"
          showData[s].tag11 = "送达地点:" + showData[s].expressAddress
          showData[s].tag22 = "代拿地点:" + showData[s].expressArrivalAddress
          showData[s].tagC1 = "#FF3F38"
          showData[s].tagC2 = "#F8A028"
          showData[s].showContract = showData[s].expressContract
          showData[s].showNote = showData[s].expressNote
          newShowData.push(showData[s])
          break
      }
    }

    this.setData({
      showData: newShowData
    })
  },

  takeErrand(errand) {
    wx.request({
      url: app.globalData.baseUrl + "/v1/errand/take",
      data: {
        id: errand.id,
        phone: this.data.userInfo.phone
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.F_responseNo == 10000) {
          wx.showToast({
            title: '接单成功',
            icon: 'none'
          })
          // this.getErrandList()
          setTimeout(function() {
            wx.setStorageSync("errand", errand)
            wx.navigateTo({
              url: '/pages/receivedetail/receivedetail',
            })
          }, 500);
        } else {
          wx.showToast({
            title: res.data.F_responseMsg,
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '接单失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },


  doTake(event) {
    if (this.data.school.isBind == 0) {
      wx.showToast({
        title: '当前学校没有站长入驻，暂不能接单',
        icon: 'none'
      })
      return
    }

    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请到我的-绑定手机',
        icon: 'none'
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '/pages/masterregister/masterregister',
        })
      }, 500);
      return
    }

    var index = Number(event.currentTarget.dataset.index)
    wx.showModal({
      title: '提示',
      content: '你确定要接单吗?',
      showCancel: true,
      success: res => {
        if (res.confirm) {
          this.takeErrand(this.data.showData[index])
        }
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
        title: '请到我的-绑定手机',
        icon: 'none'
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 500);
    }

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
    this.getErrandList()
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

  }
})