// pages/addaddress/addaddress.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentErrandPhone:"",
    currentErrandAddress: "",
    currentErrandName: "",
    currentSellPhone: "",
    currentSellAddress: "",
    currentSellName: ""
  },

  changeErrandAddress(event) {
    var value = event.detail.value
    this.setData({
      currentErrandAddress: value
    })
  },

  changeErrandName(event) {
    var value = event.detail.value
    this.setData({
      currentErrandName: value
    })
  },

  changeErrandPhone(event) {
    var value = event.detail.value
    this.setData({
      currentErrandPhone: value
    })
  },

  changeSellAddress(event) {
    var value = event.detail.value
    this.setData({
      currentSellAddress: value
    })
  },

  changeSellName(event) {
    var value = event.detail.value
    this.setData({
      currentSellName: value
    })
  },

  changeSellPhone(event) {
    var value = event.detail.value
    this.setData({
      currentSellPhone: value
    })
  },

  addSellAddress(){

  },

  addErrandAddress() {

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