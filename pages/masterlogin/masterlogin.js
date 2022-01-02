// pages/masterlogin/masterlogin.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentAccount: "",
    currentPassword: "",
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