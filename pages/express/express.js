// pages/express/express.js
Page({

  /**
   * Page initial data
   */
  data: {
    sizeList: ["小件", "中件", "大件"],
    timeList: ["今天上午", "今天中午", "今天下午"],
    currentSizeindex: 0,
    currentTimeindex: 0,
    currentReceiveAddress: "",
    currentNote: "",
    currentStore: "",
    changePhone: "",
    currentTimeNote: "",
    currentExpressCount: 0,
    urgentStatus: 0,
    currentAmount: 0,
    currentPhotos: ["",""],
  },

  changeUrgentStatus() {
    var newUrgentStatus = (this.data.urgentStatus == 0) ? 1 : 0
    this.setData({
      urgentStatus: newUrgentStatus
    })
  },

  changeSize(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentSizeindex: index
    })
  },

  changeTime(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentTimeindex: index
    })
  },

  changeTimeNote(event) {
    var value = event.detail.value
    this.setData({
      currentTimeNote: value
    })
  },

  changePhone(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentSizeindex: index
    })
  },


  changeNote(event) {
    var value = event.detail.value
    this.setData({
      currentNote: value
    })
  },

  changeStore(event) {
    var value = event.detail.value
    this.setData({
      currentStore: value
    })
  },

  changeReceiveAddress(event) {
    var value = event.detail.value
    this.setData({
      currentReceiveAddress: value
    })
  },

  changeExpressCount(event) {
    var value = Number(event.detail.value)
    this.setData({
      currentExpressCount: value
    })
  },

  changeAmount(event) {
    var value = Number(event.detail.value)
    this.setData({
      currentAmount: value
    })
  },

  deletePhoto(event){
    var index = Number(event.currentTarget.dataset.index)
    var photoList = this.data.currentPhotos
    photoList.splice(index,1)
    this.setData({
      currentPhotos: photoList
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