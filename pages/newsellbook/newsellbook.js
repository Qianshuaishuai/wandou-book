// pages/newsellbook/newsellbook.js
Page({

  /**
   * Page initial data
   */
  data: {
    questionList: [{
      "question": "1.如何卖书",
      "answer": "1.扫描书本背后条码查询回收价格\n2.满18本或28 元提交订单等待亩核通过\n3.审核通过后将书籍打包完交付快递小哥《您无需支付任何费用，我们承担运费)\n4.书籍抵达仓库后核验打款",
      "isShow": false
    }, {
      "question": "2.卖书快递包邮",
      "answer": "您无需支付快递费用，卖书我们支付快递费用，您只需要将书籍打包完交给快递员即可",
      "isShow": false
    }, {
      "question": "3.卖书后的金额如何提现,不合格的书如何取回",
      "answer": "卖书核验后钱款在我的-钱包中进行提现\n不合格的书取回需在订单审核完成2天内联系客服取回，取回需支付退回运费5元",
      "isShow": false
    }, {
        "question": "4.什么样的书不收、书籍价格如何确定",
        "answer": "我们将书籍分为合格与不合格两个等级合格即可获得 100%的回收金额不合格将获得 0 % 的回收金额不合格的原因: 发毒、盗版、缺页、水渍、上下册缺失一册如您提交的回收的书籍无以上问题，则可以获得全部预估回收金额",
      "isShow": false
    }, {
        "question": "5.我有大批量书籍需要如何处理",
        "answer": "您可以在我的-客服微信联系客服获得联系方式，开通代理版本扫码卖书，每单不限制提交数量",
      "isShow": false
    }, {
        "question": "6.公共课英语书为什么无法下单",
        "answer": "公共课英语书单独回收需联系客服进行确认下单，如果您有需要处理的公共课英语书，您可以联系客服下单",
      "isShow": false
    }]
  },

  scan(event) {
    wx.switchTab({
      url: '/pages/receivecar/receivecar',
    })
  },

  goToQuestion() {
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },

  goToReceivecar() {
    var showTime = wx.getStorageSync('showTime')
    var date2 = new Date();
    wx.setStorageSync("showTime", date2)
    var date3 = date2.getTime() - new Date(showTime).getTime();

    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    if (minutes > 1 || showTime == '') {
      wx.requestSubscribeMessage({
        tmplIds: ['ur-7dxigeVUPmNTzzIOfwfk5SGr4_LVX3R-6TRJehSw'],
        success(res) {

        },
        fail(res) {
          console.log(res)
        }
      })
    }
    wx.switchTab({
      url: '/pages/receivecar/receivecar',
    })
  },

  clickQuestion(event) {
    var index = Number(event.currentTarget.dataset.index)
    var list = this.data.questionList
    if (!list[index].isShow) {
      for (var r = 0; r < list.length; r++) {
        list[r].isShow = false
      }

      list[index].isShow = true
    } else {
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