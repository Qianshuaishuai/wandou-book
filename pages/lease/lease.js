// pages/lease/lease.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentTypeIndex: 0,
    testList: ["", "", "", "", "", ""],
    school: {},
    typeList: [{
      "id": 4,
      "name": "租赁"
    }, {
      "id": 5,
      "name": "陪玩"
    }, {
      "id": 6,
      "name": "悬赏"
    }],

    showData: [],
    userInfo: {} 
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

  takeClick(event) {
    if (this.data.school.isBind == 0) {
      wx.showToast({
        title: '当前学校没有站长入驻，暂不能接单',
        icon: 'none'
      })
      return
    }
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

  takeErrand(id) {
    wx.request({
      url: app.globalData.baseUrl + "/v1/errand/take",
      data: {
        id: id,
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
          this.setData({
            selectStatus: 1
          })
          this.getErrandList()
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

  changeIndex(event) {
    var index = Number(event.currentTarget.dataset.index)
    this.setData({
      currentTypeIndex: index,
    })
    this.getErrandList()
  },

  getErrandList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/errand/other/list',
      data: {
        phone: this.data.userInfo.phone,
        type: this.data.typeList[this.data.currentTypeIndex].id,
        school_id: this.data.school.id,
        status: 1
      },
      success: res => {
        this.setData({
          showData: res.data.F_data
        })
      },
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
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 500);
    }
    var school = wx.getStorageSync('school')
    this.setData({
      school: school
    })
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