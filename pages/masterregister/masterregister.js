// pages/masterregister/masterregister.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentPhone: "",
    currentVerify: "",
    showUnbindDialog:false,
  },

  changePhone(event) {
    var value = event.detail.value
    this.setData({
      currentPhone: value
    })
  },

  verify(event){

  },

  bind(event) {

  },

  changeVerify(event) {
    var value = event.detail.value
    this.setData({
      currentVerify: value
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  unbind(event) {
    this.setData({
      showUnbindDialog: true
    })
  },

  closeDialog(event) {
    this.setData({
      showUnbindDialog: false
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