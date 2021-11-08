// pages/newerrand/newerrand.js
Page({

  /**
   * Page initial data
   */
  data: {
    testList: ["a", "a", "a", "a", "a"],
    currentTypeindex: 0,
    currentCount: 0,
    currentNeed: "",
    currentTakeAddress: "",
    currentSendAddress: "",
  },

  changeType(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentTypeindex: index
    })
  },

  changeCount(event) {
    var value = Number(event.detail.value)
    this.setData({
      currentCount: value
    })
  },

  changeNeed(event) {
    var value = event.detail.value
    this.setData({
      currentNeed: value
    })
  },

  changeTakeAddress(event) {
    var value = event.detail.value
    this.setData({
      currentTakeAddress: value
    })
  },

  changeSendAddress(event) {
    var value = event.detail.value
    this.setData({
      currentSendAddress: value
    })
  },

  bindPickerDateChange(event){
    console.log(event)
  },

  release(){

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