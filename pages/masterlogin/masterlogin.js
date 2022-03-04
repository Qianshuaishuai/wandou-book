// pages/masterlogin/masterlogin.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentAccount: "",
    currentPassword: "",
    userInfo: {},
  },

  changeAccount(event) {
    var value = event.detail.value
    this.setData({
      currentAccount: value
    })
  },

  create(event) {
    // wx.navigateTo({
    //   url: '/pages/masterregister/masterregister',
    // })
    wx.showToast({
      title: '请联系客服',
      icon: 'none'
    })
  },

  forget(event) {
    wx.showToast({
      title: '请联系客服',
      icon: 'none'
    })
  },

  login(event) {
    var currentAccount = this.data.currentAccount
    var currentPassword = this.data.currentPassword

    if (currentAccount == ""){
      wx.showToast({
        title: '帐号不能为空',
        icon: 'none'
      })
      return
    }

    if (currentPassword == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return
    }

    wx.request({
      url: app.globalData.baseUrl + '/v1/wx/login/school/master',
      data: {
        phone: this.data.userInfo.phone,
        amount: currentAccount,
        password: currentPassword
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          console.log(res.data.F_data)
          wx.setStorageSync("master", res.data.F_data)
          wx.showToast({
            title: '登录成功',
            icon: 'none'
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        } else {
          wx.showToast({
            title: res.data.F_responseMsg,
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: this.data.currentSellOperate + '失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },

  changePassword(event) {
    var value = event.detail.value
    this.setData({
      currentPassword: value
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo, 
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