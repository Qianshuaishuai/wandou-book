// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    testData: [{
      "name": "测试书籍1测试书籍1测试书籍1测试书籍1测试书籍1",
      "price": "2.73",
      "rprice": "1.55"
    }, {
      "name": "测试书籍2",
      "price": "2.73",
      "rprice": "1.55"
    }, {
      "name": "测试书籍3",
      "price": "2.73",
      "rprice": "1.55"
    }, {
      "name": "测试书籍4",
      "price": "2.73",
      "rprice": "1.55"
    }],
    orderData: {},
    currentStatus: "",
    currentCity:"",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getOrderDatail(options.id)
  },

  getOrderDatail(id) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/order/detail',
      data: {
        id: id,
      },
      method: 'GET',
      success: res => {
        var order = res.data.F_data
        var totalCount = 0
        for (var o = 0; o < order.orderBooks.length; o++) {
          totalCount = totalCount + order.orderBooks[o].count
        }
        order.count = totalCount
        this.setData({
          orderData: order
        })
        
        var currentCity = ""
        switch(this.data.orderData.addressId){
          case 1:
            currentCity = "浙江"
          break
          case 2:
            currentCity = "安徽"
          break
          case 3:
            currentCity = "江苏"
          break
          default:
            currentCity = "未知"
          break
        }

        var statusName = ""
        switch (this.data.orderData.status) {
          case 1:
            statusName = "待确认"
            break;
          case 2:
            statusName = "待取件"
            break;
          case 3:
            statusName = "待审核"
            break;
          case 4:
            statusName = "审核完毕"
            break;
          case -1:
            statusName = "订单已取消"
            break;
          default:
            statusName = "未知订单状态"
            break;
        }

        this.setData({
          currentStatus: statusName,
          currentCity: currentCity
        })
      },
    })
  },

  goToTrack(event){
    var orderNo = event.currentTarget.dataset.orderno;
     wx.navigateTo({
       url: '/pages/track/track?orderNo='+orderNo,
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