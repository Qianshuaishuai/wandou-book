// pages/newme/newme.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  goToOrder(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/order/order?index=' + index,
    })
  },

  releaseErrand(event){
    wx.navigateTo({
      url: '/pages/errandlist/errandlist',
    })
  },

  takeErrand(event) {
    wx.navigateTo({
      url: '/pages/takeerrand/takeerrand',
    })
  },

  drawal(event){
    wx.navigateTo({
      url: '/pages/newdrawal/newdrawal',
    })
  },

  masterlogin(){
    wx.navigateTo({
      url: '/pages/masterlogin/masterlogin',
    })
  },

  applyMaster(){
    wx.navigateTo({
      url: '/pages/masterpost/masterpost',
    })
  },

  goToBindPhone() {
    wx.navigateTo({
      url: '/pages/masterregister/masterregister',
    })
  },

  copyWechat(){
    wx.showToast({
      title: '复制客服微信成功',
      icon: 'none'
    })
  },

  goToPartner() {
    wx.navigateTo({
      url: '/pages/promotion/promotion',
    })
  },

  goToAddress() {
    wx.navigateTo({
      url: '/pages/addaddress/addaddress',
    })
  },

  goToSell() {
    wx.navigateTo({
      url: '/pages/addsecondhand/addsecondhand',
    })
  },

  goToBuy() {
    wx.navigateTo({
      url: '/pages/secondhandindex/secondhandindex',
    })
  },

  goToQuestion(){
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },

  goToNewIncome() {
    wx.navigateTo({
      url: '/pages/newincome/newincome',
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