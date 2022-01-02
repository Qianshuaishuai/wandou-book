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
  },

  back() {
    wx.navigateBack({
      delta: 1
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
    this.getErrandList()
  },

  getErrandList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/errand/other/list',
      data: {
        phone: "15602335027",
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
          showData[s].showPrice = showData[s].agentPrice
          showData[s].tip1 = "送达时间: " + showData[s].agentArrivalTime
          showData[s].tip2 = "代购商品: " + showData[s].agent
          showData[s].tag1 = "商"
          showData[s].tag2 = "收"
          showData[s].tag11 = showData[s].agentStoreAddress
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
          showData[s].tip2 = "跑腿要求: " + showData[s].otherErrandAsk
          showData[s].tag1 = "收"
          showData[s].tag2 = "跑"
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
          showData[s].tag1 = "游"
          showData[s].tag2 = "目"
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
          showData[s].tag2 = "数"
          showData[s].tag11 = showData[s].rewardTask
          showData[s].tag22 = showData[s].rewardTaskCount
          showData[s].tagC1 = "#FF3F38"
          showData[s].tagC2 = "#F8A028"
          showData[s].showContract = showData[s].rewardContract
          showData[s].showNote = showData[s].rewardNote
          newShowData.push(showData[s])
          break
        case 7:
          showData[s].showPrice = showData[s].expressPrice
          showData[s].tip1 = "备注: " + showData[s].expressNote
          showData[s].tag1 = "代"
          showData[s].tag2 = "送"
          showData[s].tag11 = showData[s].expressAddress
          showData[s].tag22 = showData[s].expressArrivalAddress
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

  takeErrand(id) {
    wx.request({
      url: app.globalData.baseUrl + "/v1/errand/take",
      data: {
        id: id,
        phone: "15602335027"
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
          this.getErrandList()
        } else {
          wx.showToast({
            title: '接单失败,联系管理员',
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
    wx.showToast({
      title: '当前学校没有站长入驻，暂不能接单',
      icon: 'none'
    })
    return
    var index = Number(event.currentTarget.dataset.index)
    wx.showModal({
      title: '提示',
      content: '你确定要接单吗?',
      showCancel: true,
      success: res => {
        if (res.confirm) {
          this.takeErrand(this.data.showData[index].id)
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