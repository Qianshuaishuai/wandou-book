// pages/goodthings/goodthings.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
   goodDatas:[],
  },

  getGoodList(){
    wx.request({
      url: app.globalData.baseUrl + '/v1/good/list',
      data: {

      },
      method: 'GET',
      success: res => {
        this.setData({
          goodDatas: res.data.F_data
        })
      },
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getGoodList()
  },

  goToDetail(e){
    var index = e.currentTarget.dataset.index
    wx.setStorageSync("resource", this.data.goodDatas[index])
    wx.navigateTo({
      url: "/pages/book/book?type=2"
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