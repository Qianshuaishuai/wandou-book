// pages/order/order.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentStatus:0,
    currentOrder:[],
    statuses: ["全部订单", "待确认", "待取件", "待审核", "审核完毕"],
  },

  cancelOrder(e){
    var orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '订单一旦取消不能再更改，请确认',
      success: res => {
        if (res.cancel) {
          return
        }

        wx.request({
          url: app.globalData.baseUrl + '/v1/order/cancel',
          data: {
            id: orderId,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            if (res.data.F_responseNo == 10000) {
              wx.showToast({
                title: '取消成功',
                icon: 'none'
              })

              this.getOrder(this.data.currentStatus)
            } else {
              wx.showToast({
                title: '取消失败，请联系管理员',
                icon: 'none'
              })
            }

          },
        })
      }
    })
  },

  changeStatus(e){
    this.setData({
      currentStatus:e.currentTarget.dataset.index
    })

    this.getOrder(this.data.currentStatus)
  },

  getOrder(status){
    var orderStatus = 1
    var wxid = wx.getStorageSync("userId")
    orderStatus = status
    wx.request({
      url: app.globalData.baseUrl + '/v1/order/list',
      data: {
        wx_id: wxid,
        status: orderStatus,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if(res.data.F_responseNo == 10000){
          var currentOrders = res.data.F_data
          for(var c = 0;c<currentOrders.length;c++){
            var currentOrder = currentOrders[c]
            var totalCount = 0
            for(var o=0;o<currentOrder.orderBooks.length;o++){
              totalCount = totalCount + currentOrder.orderBooks[o].count
            }
            currentOrders[c].count = totalCount
          }
          this.setData({
            currentOrder: currentOrders
          })
        }else{
          wx.showToast({
            title: '此状态下并未有相关订单',
            icon: 'none',
            duration: 2000
          })
          this.setData({
            currentOrder: []
          })
        }
      },
    })
  },

  goToDetail(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?id=' + id
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const index = options.index
    this.setData({
      currentStatus:Number(index)
    })
    this.getOrder(this.data.currentStatus)
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