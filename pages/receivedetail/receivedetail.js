// pages/receivedetail/receivedetail.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    errand: {},
    userInfo: {

    },
    showUnbindDialog: false,
    message: "",
    wxUserInfo: {},
    showPicDialog: false,
    currentShowPic: "",
    windowWidth: 0,
    windowHeight: 0,
    showHeight: 0
  },

  back() {
    wx.navigateBack({
      delta: 1
    })
  },

  closeDialog(event) {
    this.setData({
      showUnbindDialog2: false,
      showPicDialog: false
    })
  },

  showPic(event) {
    var url = event.currentTarget.dataset.url
    this.setData({
      showPicDialog: true,
      currentShowPic: url
    })
    wx.getImageInfo({
      src: url,
      success: res => {
        console.log(res)
        var width = res.width
        var height = res.height
        var windowWidth = wx.getSystemInfoSync().windowWidth
        var windowHeight = wx.getSystemInfoSync().windowHeight
        var range = height / width
        var showHeight = range * (windowWidth - 60)

        this.setData({
          windowWidth: windowWidth,
          showHeight: showHeight,
          windowHeight: windowHeight,
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  clickPhone(event) {
    wx.showModal({
      title: '提示',
      content: '确定拨打电话给' + this.data.errand.showContract,
      showCancel: true,
      success: res => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: this.data.errand.showContract,
          })
        }
      }
    })

  },

  changeMessage(event) {
    this.setData({
      message: event.detail.value
    })
  },

  closeDialog(event) {
    this.setData({
      showUnbindDialog: false,
      showPicDialog: false,
    })
  },

  clickMessage(event) {
    wx.showToast({
      title: '开发中,请微信或电话沟通',
      icon: 'none'
    })
    return
    this.setData({
      showUnbindDialog: true,
      message: ''
    })
  },

  cancel(event) {
    this.setData({
      showUnbindDialog: false
    })
  },

  send(event) {
    if (this.data.message == "") {
      wx.showToast({
        title: '请输入待发送信息',
        icon: 'none'
      })
      return
    }

    this.setData({
      showUnbindDialog: false
    })

    var sendPhone = this.data.userInfo.phone
    var sendName = this.data.wxUserInfo.nickName
    var sendIcon = this.data.wxUserInfo.avatarUrl
    var receivePhone = this.data.errand.phone
    var message = this.data.message

    wx.request({
      url: app.globalData.baseUrl + '/v1/message/create',
      data: {
        "send_phone": sendPhone,
        "send_name": sendName,
        "send_icon": sendIcon,
        "receive_phone": receivePhone,
        "message": message,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          wx.showToast({
            title: '发送成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '发送失败,联系管理员',
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '发送失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var errand = wx.getStorageSync('errand')
    if (errand.expressPhotos != "") {
      errand.photoList = JSON.parse(errand.expressPhotos)
    }
    this.setData({
      errand: errand
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
    var wxUserInfo = wx.getStorageSync('wxUserInfo')
    this.setData({
      userInfo: userInfo,
      wxUserInfo: wxUserInfo
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

  }
})