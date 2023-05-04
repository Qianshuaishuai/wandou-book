// pages/webview/webview.js
Page({

  /**
   * Page initial data
   */
  data: {
    webURL:"",
    webURLs: ["https://mp.weixin.qq.com/s/QBvTpAZZoe3HyYlxHesbhw", "https://mp.weixin.qq.com/s/XCC2yRnixjAbT8ZuF7lwiw","https://mp.weixin.qq.com/s/QOIrPnzxAKVyDT9cVNQukw"]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var index = options.index
    this.setData({
      webURL: this.data.webURLs[index]
    })
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