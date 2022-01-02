// pages/newdrawal/newdrawal.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    currentAmount:0,
    userInfo: {}
  },

  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  changeAmount(event){
    var value = Number(event.detail.value)
    this.setData({
      currentAmount: value
    })
  },

  allDrawal(event){
    this.setData({
      currentAmount: this.data.userInfo.sellBalance + this.data.userInfo.errandBalance
    })
  },

  commit(event){
    if(this.data.currentAmount<=0){
      wx.showToast({
        title: '提现金额需大于0',
        icon: 'none'
      })

      return
    }

    
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo,
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})