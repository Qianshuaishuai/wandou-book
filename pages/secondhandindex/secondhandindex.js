// pages/secondhandindex/secondhandindex.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    currentSearch: "",
    typeList: ["书籍", "日用品", "电子产品", "电动车/自行车", "服饰鞋包", "美妆", "耳机"],
  },

  back() {
    wx.navigateBack({
      delta: 1
    })
  },


  changeSearch(event) {
    var value = event.detail.value
    this.setData({
      currentSearch: value
    })
  },

  deleteSearch(event) {
    this.setData({
      currentSearch: ""
    })
  },

  release(event){
    wx.navigateTo({
      url: '/pages/addsecondhand/addsecondhand',
    })
  },

  buy(event) {
    wx.navigateTo({
      url: '/pages/secondhand/secondhand',
    })
  },
  
  back() {
    wx.navigateBack({
      delta: 1
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