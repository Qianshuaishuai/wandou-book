// pages/receivedetail/receivedetail.js
const app = getApp()  
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    errand:{},
  },

  back() {
    wx.navigateBack({
      delta: 1
    })
  },

  clickPhone(event){

  },

  clickMessage(event) {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var errand = wx.getStorageSync('errand')
    this.setData({
      errand: errand
    })
    console.log(this.data.errand)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

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