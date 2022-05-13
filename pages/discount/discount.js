// pages/discount/discount.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    currentIndex: 0,
    testList: ["", "", "", "", "", ""],
    couponList: [],
    postHeight: 0,
  },

  changeIndex(event) {
    var index = Number(event.currentTarget.dataset.index)
    this.setData({
      currentIndex: index,
    })
  },

  back() {
    wx.navigateBack({
      delta: 1
    })
  },

  copy(event) {
    var index = Number(event.currentTarget.dataset.index)
    var command = this.data.couponList[index].command
    wx.setClipboardData({
      data: command,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制口令成功'
            })
          }
        })
      }
    })
  },

  getTaobaoCouponoList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/taobaocoupon/list',
      success: res => {
        var list = res.data.F_data
        for (var l = 0; l < list.length; l++) {
          switch (list[l].type) {
            case 1:
              list[l].typeStr = "Taobao"
              break

            case 2:
              list[l].typeStr = "Tianmao"
              break

            case 3:
              list[l].typeStr = "Jingdong"
              break
          }
        }
        this.setData({
          couponList: res.data.F_data
        })
      },
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getTaobaoCouponoList()
    this.thanslateData()
  },

  thanslateData() {
    var clientHeight = wx.getSystemInfoSync().windowHeight
    var clientWidth = wx.getSystemInfoSync().windowWidth
    let changeHeight = 750 / clientWidth;
    let height = clientHeight * changeHeight;

    var postHeight = height - 200 - 41 * changeHeight - 28
    this.setData({
      postHeight: postHeight
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