// pages/newindex2/newindex2.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    testList: ["", "", "", "", ""],
    background: ['https://resource.qimsj.com/wandou/banner1.png', 'https://resource.qimsj.com/wandou/banner2.png', 'https://resource.qimsj.com/wandou/banner3.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2500,
    duration: 500,
    tweetList: []
  },

  swiperClick(event) {
    var index = Number(event.currentTarget.dataset.index)
    var url = ""
    switch (index) {
      case 0:
        url = '/pages/errandindex/errandindex'
        break
      case 1:
        url = '/pages/certrider/certrider'
        break
      case 2:
        url = '/pages/newcoupon/newcoupon'
        break
    }

    wx.navigateTo({
      url: url,
    })
  },

  getTweetList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/tweet/list',
      success: res => {
        this.setData({
          tweetList: res.data.F_data
        })
      },
    })
  },

  readTweetList(id) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/tweet/read',
      data: {
        wxid: wx.getStorageSync("userId"),
        id: id
      },
      method: 'POST',
      success: res => {
        console.log(res)
      },
    })
  },

  goToSecondIndex(event) {
    wx.navigateTo({
      url: '/pages/secondhandindex/secondhandindex',
    })
  },

  goToDiscount(event) {
    wx.navigateTo({
      url: '/pages/discount/discount',
    })
  },

  goToSchool(event) {
    wx.navigateTo({
      url: '/pages/pickschool/pickschool',
    })
  },

  goToSellbook(event) {
    wx.switchTab({
      url: '/pages/newsellbook/newsellbook',
    })
  },

  goTolease(event) {
    wx.navigateTo({
      url: '/pages/lease/lease',
    })
  },


  goToErrand(event) {
    wx.navigateTo({
      url: '/pages/errandindex/errandindex',
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getTweetList()
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