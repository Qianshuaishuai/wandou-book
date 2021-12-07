// pages/certrider/certrider.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentStudentNo:"",
    currentName:""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  changeName(event) {
    var value = event.detail.value
    this.setData({
      currentName: value
    })
  },

  changeStudentNo(event) {
    var value = event.detail.value
    this.setData({
      currentStudentNo: value
    })
  },

  commit(event){

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