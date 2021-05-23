// pages/help/help.js
Page({

  /**
   * Page initial data
   */
  data: {
    helpdatas: [{
      "tip": "1.怎么卖书给豌豆",
      "isSelect": false,
      "detail": '第一步 拿出闲置书籍扫描背后条形码查询回收价格\n第二步 提交订单 并打包好写上订单编号姓名电话交给快递员\n第三步 书籍审核 余额到账'
    }, {
      "tip": "2.我的书有笔记可以卖吗",
      "isSelect": false,
      "detail": "当然可以，我们专业回收二手书籍"
    }, {
      "tip": "3.这个卖书余额是可以提现的吗",
      "isSelect": false,
      "detail": "是的，余额是可以提现"
    }, {
      "tip": "4.审核需要多久时间",
      "isSelect": false,
      "detail": "审核一般需要收件后3-14天，遇到毕业高峰季则稍做延顺"
    }, {
      "tip": "5.为什么书籍价格会有浮动",
      "isSelect": false,
      "detail": "我们书籍回收价格基于市场价格实时变动"
    }, {
      "tip": "6. 提现多久到账",
      "isSelect": false,
      "detail": "提现发起后1-3个工作日到账"
    }, {
      "tip": "7.我该如何成为合伙人",
      "isSelect": false,
      "detail": "你可以在合伙人界面申请成为我们首批合伙人，你可以在你的朋友圈或者班级社团中推广我们小程序"
    }, {
      "tip": "8.为什么卖书金额跟预估金额有差异",
      "isSelect": false,
      "detail": "每本图书我们需要支付2-3元快递费 部分发霉缺页的书籍我们视为品相不合格或者相应稍作折扣 这部分书籍我们>进行销毁处理 如需取回则需要支付快递费用五元"
    }, {
      "tip": "9.如何联系客服",
      "isSelect": false,
      "detail": "一号微信:Wandoubook\n二号微信:yuxiukeji"
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