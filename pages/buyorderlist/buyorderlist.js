// pages/buyorderlist/buyorderlist.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentStatus: 0,
    buyorder: [],
    orderStatus: ["待付款", "待发货", "待收货", "已完成", "退款/售后"],
    quality: ["一般", "全新", "良好"],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var index = options.index
    if (index != undefined) {
      this.getBuyorderList(index)
      this.setData({
        currentStatus: index
      })
    } else {
      this.getBuyorderList(0)
    }

  },

  sureOrder(e) {
    var index = e.currentTarget.dataset.index
    var buyorder = this.data.buyorder

    wx.showModal({
      title: '订单提示',
      content: '你确定是否已经收到货',
      success: res => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + '/v1/buyorder/sure',
            data: {
              orderId: buyorder[index].id,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              if (res.data.F_responseNo == 10000) {
                wx.showToast({
                  title: '确认收货成功',
                  icon: 'none'
                })

                this.getBuyorderList(this.data.currentStatus)
              } else {

              }

            },
          })

        }

      }
    })

  },

  cancelOrder(e) {
    var index = e.currentTarget.dataset.index
    var buyorder = this.data.buyorder
    wx.showModal({
      title: '订单提示',
      content: '确定是否取消订单',
      success: res => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + '/v1/buyorder/cancel',
            data: {
              orderId: buyorder[index].id,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              if (res.data.F_responseNo == 10000) {
                wx.showToast({
                  title: '取消订单成功',
                  icon: 'none'
                })

                this.getBuyorderList(this.data.currentStatus)
              } else {

              }

            },
          })

        }

      }
    })

  },

  refundOrder(e) {
    var index = e.currentTarget.dataset.index
    var buyorder = this.data.buyorder
    wx.showToast({
      title: '暂不支持退款/售后',
      icon: 'none'
    })
    // wx.request({
    //   url: app.globalData.baseUrl + '/v1/buyorder/cancel',
    //   data: {
    //     id: buyorder[index].id
    //   },
    //   success: res => {
    //     if (res.data.F_responseNo == 10000) {
    //       wx.showToast({
    //         title: '取消订单成功',
    //         icon: 'none'
    //       })

    //       this.getBuyorderList(this.data.currentStatus)
    //     } else {

    //     }

    //   },
    // })
  },

  getBuyorderList(status) {
    if(status == 4){
      status = -999
    }
    wx.request({
      url: app.globalData.baseUrl + '/v1/buyorder/list',
      data: {
        wx_id: wx.getStorageSync("userId"),
        status: status,
      },
      success: res => {
        if (res.data.F_responseNo == 10000) {
          this.setData({
            buyorder: res.data.F_data
          })
        } else {
          this.setData({
            buyorder: []
          })
        }

      },
    })
  },

  goToPay(e) {
    var index = e.currentTarget.dataset.index
    var buyorder = this.data.buyorder

    this.goToWxPay(buyorder[index].id)
  },

  goToDetail(e) {
    var index = e.currentTarget.dataset.index
    var buyorder = this.data.buyorder
    wx.setStorageSync("buyorderdetail", buyorder[index])
    wx.navigateTo({
      url: '/pages/buyorderdetail/buyorderdetail',
    })
  },

  goToWxPay(orderId) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + '/v1/buyorder/before/pay',
      data: {
        wx_id: wx.getStorageSync("userId"),
        orderId: orderId,
      },
      success: res => {
        if (res.data.F_responseNo == 10000) {
          wx.requestPayment({
            timeStamp: res.data.F_data.timestamp,
            nonceStr: res.data.F_data.nonceStr,
            package: res.data.F_data.package,
            signType: res.data.F_data.signType,
            paySign: res.data.F_data.paySign,
            success(res) {
              that.updateOrderStatus(orderId)
              wx.showToast({
                title: '支付成功',
                icon: 'none'
              })
            },
            fail(res) {
              that.goToBuyOrder()
              wx.showToast({
                title: '你取消了支付',
                icon: 'none'
              })
            }
          })
        } else {
          console.log(res)
          wx.showToast({
            title: '使用微信支付失败，请联系管理员',
            icon: 'none'
          })
        }

      },
    })
  },

  updateOrderStatus(orderId) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + '/v1/buyorder/after/pay',
      data: {
        wx_id: wx.getStorageSync("userId"),
        orderId: orderId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.F_responseNo == 10000) {
          that.getBuyorderList(this.data.currentStatus)
        } else {
          wx.showToast({
            title: '更新订单状态失败，请联系管理员',
            icon: 'none'
          })
        }
      },
    })
  },

  changeStatus(e) {
    this.setData({
      currentStatus: e.currentTarget.dataset.index
    })

    // var status = 0
    // switch (currentStatus){
    //   case 0:
    //     status = 0
    //   break
    //   case 1:
    //     break
    //   case 2:
    //     break
    //   case 3:
    //     break
    //   case 4:
    //     break
    // }
    this.getBuyorderList(this.data.currentStatus)
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