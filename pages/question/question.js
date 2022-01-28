// pages/help/help.js
Page({

  /**
   * Page initial data
   */
  data: {
    helpdatas: [{
      "tip": "1.如何申请校园站长",
      "isSelect": false,
      "detail": '我的-最下方点击提交申请-提交申请-等待专员联系'
    }, {
      "tip": "2.跑腿/闲置问题",
      "isSelect": false,
      "detail": '您可以发布订单也可以接跑腿订单赚钱生活零钱'
    }, {
      "tip": "3.如何卖书",
      "isSelect": false,
      "detail": '扫描书本后条码查询对应回收价格\n2.满28本后提交 等待通过初步审核\n3.审核通过后 请您将书籍打包 您无需支付费用 我们将安排快递上门取件\nps（为了加快审核速度请您在将书籍打包完后 贴上小纸条 写上您的姓名电话以及订单编号）'
    }, {
      "tip": "4.卖书后的金额在哪儿提现",
      "isSelect": false,
      "detail": "成功卖书后 您的余额将在我的钱包中 您可以提现至微信钱包"
    }, {
      "tip": "5.什么样的书不回收",
      "isSelect": false,
      "detail": "我们将书籍分为 良好 一般 拒收三个等级\n良好：可以获得该本全部预估回收价格\n一般：可以获得70%～90% 的回收价格\n拒收：该本书籍不合格 回收价格为0\n拒收的原因：发霉 盗版 缺页 水渍 乱涂乱画 上下册其中一册缺失等"
    }, {
      "tip": "6.我有大批书籍需要回收如何处理",
      "isSelect": false,
      "detail": "您可以扫码每两百本提交一次并将200本书打包好贴上姓名电话订单编号，如果您的要卖得书大于5000本请联系客服专员15067057514我们将安排专车上门提货"
    }, {
      "tip": "7.为什么书籍价格会有浮动",
      "isSelect": false,
      "detail": "我们将在快递收件后七天内完成审核打款,时间节点以快递收件到达仓库为准开始计算"
    }],

    isSelect: -1,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

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