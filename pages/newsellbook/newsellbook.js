// pages/newsellbook/newsellbook.js
Page({

  /**
   * Page initial data
   */
  data: {
    questionList: [{
      "question": "1.卖书后的金额在哪来进行提现呢？",
      "answer": "在本平台本不会产生手续费而且卖书价格会高出 很多，请放心卖书不会产任何费用。",
      "isShow": false
    }, {
      "question": "1.卖书后的金额在哪来进行提现呢？",
      "answer": "在本平台本不会产生手续费而且卖书价格会高出 很多，请放心卖书不会产任何费用。",
      "isShow": false
    }, {
      "question": "1.卖书后的金额在哪来进行提现呢？",
      "answer": "在本平台本不会产生手续费而且卖书价格会高出 很多，请放心卖书不会产任何费用。",
      "isShow": false
    }, {
      "question": "1.卖书后的金额在哪来进行提现呢？",
      "answer": "在本平台本不会产生手续费而且卖书价格会高出 很多，请放心卖书不会产任何费用。",
      "isShow": false
    }, {
      "question": "1.卖书后的金额在哪来进行提现呢？",
      "answer": "在本平台本不会产生手续费而且卖书价格会高出 很多，请放心卖书不会产任何费用。",
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