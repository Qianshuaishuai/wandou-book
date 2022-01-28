// pages/myaddress/myaddress.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    testList: ["", "", "", "", "", ""],
    sellAddressList: [],
    errandAddressList: [],
    userInfo: {},
    status: 0
  },

  build(event) {
    wx.navigateTo({
      url: '/pages/addaddress/addaddress?id=0',
    })
  },

  editSell(event) {
    var sellAddressList = this.data.sellAddressList
    var index = Number(event.currentTarget.dataset.index)
    var id = sellAddressList[index].id
    wx.navigateTo({
      url: '/pages/addaddress/addaddress?id=' + id,
    })
  },

  deleteSell(event) {
    var sellAddressList = this.data.sellAddressList
    var index = Number(event.currentTarget.dataset.index)
    wx.showLoading({
      title: '正在删除中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/v1/newaddress/delete',
      data: {
        id: sellAddressList[index].id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })
          this.getSellAddressList()
        } else {
          wx.showToast({
            title: '删除失败,联系管理员',
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '删除失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },

  editErrand(event) {
    var errandAddressList = this.data.errandAddressList
    var index = Number(event.currentTarget.dataset.index)
    var id = errandAddressList[index].id
    wx.navigateTo({
      url: '/pages/addaddress/addaddress?id=' + id,
    })
  },

  deleteErrand(event) {
    var errandAddressList = this.data.errandAddressList
    var index = Number(event.currentTarget.dataset.index)
    wx.showLoading({
      title: '正在删除中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/v1/newaddress/delete',
      data: {
        id: errandAddressList[index].id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })
          this.getErrandAddressList()
        } else {
          wx.showToast({
            title: '删除失败,联系管理员',
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '删除失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },

  setSellDefault(event) {
    var sellAddressList = this.data.sellAddressList
    var index = Number(event.currentTarget.dataset.index)

    if (sellAddressList[index].isDefault == 1) {
      wx.showToast({
        title: '已是默认地址',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '正在设置中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/v1/newaddress/setdefault',
      data: {
        id: sellAddressList[index].id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          wx.showToast({
            title: '设置成功',
            icon: 'none'
          })
          this.getSellAddressList()
        } else {
          wx.showToast({
            title: '设置失败,联系管理员',
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '设置失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },

  setErrandDefault(event) {
    var errandAddressList = this.data.errandAddressList
    var index = Number(event.currentTarget.dataset.index)

    if (errandAddressList[index].isDefault == 1) {
      wx.showToast({
        title: '已是默认地址',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '正在设置中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/v1/newaddress/setdefault',
      data: {
        id: errandAddressList[index].id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          wx.showToast({
            title: '设置成功',
            icon: 'none'
          })
          this.getErrandAddressList()
        } else {
          wx.showToast({
            title: '设置失败,联系管理员',
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '设置失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },

  goToUse(event) {
    var index = Number(event.currentTarget.dataset.index)
    var status = this.data.status
    if (status == 1) {
      wx.navigateBack({
        delta: 1
      })

      wx.setStorage({
        key: 'addressSelect',
        data: this.data.sellAddressList[index],
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var status = options.status
    this.setData({
      status: status
    })
    var object = new Object
    object.id = 0
    wx.setStorage({
      key: 'addressSelect',
      data: object,
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
        wx.navigateTo({
          url: '/pages/masterregister/masterregister',
        })
      }, 500);
    }
    this.getSellAddressList()
    this.getErrandAddressList()
  },

  getSellAddressList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/newaddress/list',
      data: {
        phone: this.data.userInfo.phone,
        type: 2,
      },
      success: res => {
        this.setData({
          sellAddressList: res.data.F_data
        })
      },
    })
  },

  getErrandAddressList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/newaddress/list',
      data: {
        phone: this.data.userInfo.phne,
        type: 1,
      },
      success: res => {
        this.setData({
          errandAddressList: res.data.F_data
        })
      },
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