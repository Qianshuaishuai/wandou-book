// pages/buyorderdetail/buyorderdetail.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    orderDetail: {},
    orderStatus: ["待付款", "待发货", "待收货", "待发货", "退款/售后"],
    quality: ["一般", "全新", "良好"],
  },

  back(e) {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var orderDetail = wx.getStorageSync("buyorderdetail")

    orderDetail.showCancel = false
    orderDetail.showSend = false
    orderDetail.showCreate = false
    orderDetail.showPay = false
    orderDetail.showComplete = false

    if (orderDetail.createTime.indexOf("00:00:00") == -1) {
      orderDetail.showCreate = true
    }

    if (orderDetail.sendTime.indexOf("00:00:00") == -1) {
      orderDetail.showSend = true
    }

    if (orderDetail.cancelTime.indexOf("00:00:00") == -1) {
      orderDetail.showCancel = true
    }

    if (orderDetail.payTime.indexOf("00:00:00") == -1) {
      orderDetail.showPay = true
    }

    if (orderDetail.completeTime.indexOf("00:00:00") == -1) {
      orderDetail.showComplete = true
    }

    console.log(orderDetail)

    this.setData({
      orderDetail: orderDetail
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