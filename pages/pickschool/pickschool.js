// pages/pickschool/pickschool.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentSearch:"",
    testList:["","","","",""]
  },

  changeSearch(event){
    var value = event.detail.value
    this.setData({
      value: value
    })
  },

  clear(){
    this.setData({
      currentSearch: ""
    })
  },

  search(event) {

  },

  applymaster(event){
    wx.navigateTo({
      url: '/pages/masterpost/masterpost',
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