// pages/income/income.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentStatus: 0,
    currentTab: 0,
    fansCount: 0,
    active: 0,
    show: false,
    exclusiveFansArray: [],
    normalFansArray: []
  },

  changeStatus(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      currentStatus: Number(index)
    })

  },

  changeTab(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTab: Number(index)
    })

  },

  getFansList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/recommend/list',
      data: {
        wx_id: wx.getStorageSync('userId'),
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.data.F_responseNo == 10000) {
          console.log(res.data.F_data)
          this.setData({
            exclusiveFansArray: res.data.F_data[0].recommends,
            normalFansArray: res.data.F_data[1].recommends
          })
        }
      },
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getFansList()
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