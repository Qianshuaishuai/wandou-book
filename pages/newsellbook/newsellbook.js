// pages/newsellbook/newsellbook.js
Page({

  /**
   * Page initial data
   */
  data: {
    questionList: [{
      "question": "1.如何卖书",
      "answer": "1.扫描书本后条码查询对应回收价格\n2.满28本后提交 等待通过初步审核\n3.审核通过后 请您将书籍打包 您无需支付费用 我们将安排快递上门取件\nps（为了加快审核速度请您在将书籍打包完后 贴上小纸条 写上您的姓名电话以及订单编号）",
      "isShow": false
    }, {
        "question": "2.卖书后的金额在哪儿提现",
        "answer": "成功卖书后 您的余额将在我的钱包中 您可以提现至微信钱包",
      "isShow": false
    }, {
        "question": "3.什么样的书不回收",
        "answer": "我们将书籍分为 良好 一般 拒收三个等级\n良好：可以获得该本全部预估回收价格\n一般：可以获得70%～90% 的回收价格\n拒收：该本书籍不合格 回收价格为0\n拒收的原因：发霉 盗版 缺页 水渍 乱涂乱画 上下册其中一册缺失等",
      "isShow": false
    }, {
        "question": "4.我有大批书籍需要回收如何处理",
      "answer": "在本平台本不会产生手续费而且卖书价格会高出 很多，请放心卖书不会产任何费用。",
      "isShow": false
    }, {
      "question": "1.卖书后的金额在哪来进行提现呢？",
        "answer": "您可以扫码每两百本提交一次并将200本书打包好贴上姓名电话订单编号，如果您的要卖得书大于5000本请联系客服专员15067057514我们将安排专车上门提货",
      "isShow": false
    }]
  },

  scan(event){
    wx.switchTab({
      url: '/pages/receivecar/receivecar',
    })
  },

  goToQuestion() {
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },


  clickQuestion(event){
    var index = Number(event.currentTarget.dataset.index)
    var list = this.data.questionList
    if (!list[index].isShow){
      for(var r = 0;r<list.length;r++){
        list[r].isShow =false
      }

      list[index].isShow = true
    }else{
      list[index].isShow = false
    }
    this.setData({
      questionList: list
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