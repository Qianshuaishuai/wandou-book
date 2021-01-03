// pages/help/help.js
Page({

  /**
   * Page initial data
   */
  data: {
    helpdatas: [{
      "tip": "1.如何卖书",
      "isSelect": false,
      "detail": "扫码书本背后的13位ISBN码可以获取对应回收价格满38本后可以提交订单,写上订单编号将书本提交给快递员"
    }, {
        "tip": "2.卖书的书款",
        "isSelect": false,
        "detail": "在审核通过后发放到余额，发起提现后在1-3个工作日支付到您的账户"
      }, {
        "tip": "3.合伙人分享的佣金",
        "isSelect": false,
        "detail": "合伙人分享佣金需在您分享的人的订单审核结束后才可以到账"
      }],

    isSelect: -1,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  select(e) {
    var index = e.currentTarget.dataset.index
    if (index !== this.data.isSelect) {
      this.setData({
        isSelect: index
      })
    } else {
      this.setData({
        isSelect: -1
      })
    }
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