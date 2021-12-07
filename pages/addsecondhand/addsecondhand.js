// pages/addsecondhand/addsecondhand.js
Page({

  /**
   * Page initial data
   */
  data: {
    typeList: ["书籍", "日用品", "电子产品", "自行车", "美妆", "服饰鞋包", "电动车", "其他"],
    currentTypeindex: 0,
    currentWechat: "",
    currentAddress: "",
    currentAmount: 0,
    currentReason: "",
    currentPhotos: ["", "", ""],
  },

  changeType(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentTypeindex: index
    })
  },

  changeAddress(event) {
    var value = event.detail.value
    this.setData({
      currentAddress: value
    })
  },

  changeAmount(event) {
    var value = Number(event.detail.value)
    this.setData({
      currentAmount: value
    })
  },

  changeWechat(event) {
    var value = event.detail.value
    this.setData({
      currentWechat: value
    })
  },

  changeReason(event) {
    var value = event.detail.value
    this.setData({
      currentReason: value
    })
  },

  //发布
  release() {

  },

  deletePhoto(event) {
    var index = Number(event.currentTarget.dataset.index)
    var photoList = this.data.currentPhotos
    photoList.splice(index, 1)
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