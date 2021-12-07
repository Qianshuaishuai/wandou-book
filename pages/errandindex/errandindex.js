// pages/errandindex/errandindex.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    testList: ["", "", "", "", "", ""]
  },
  
  back() {
    wx.navigateBack({
      delta: 1
    })
  },


  release() {
    wx.navigateTo({
      url: '/pages/newerrand/newerrand',
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
  onLoad: function (options) {

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