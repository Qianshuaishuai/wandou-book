// pages/buyorder/buyorder.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    currentNote: "",
    buycar: [],
    qualitys: ["一般", "全新", "良好"],
    postage: 0.0,
    allPrice: 0.0,
    couponCount: 12.0,
    allCount: 0,
    finalAllPrice: 0.0,
    disCount: 0,
    addressObj: {},
    finalOldPrice: 0.0,
    currentSelectCoupon: undefined,
  },

  changeNote(e) {

  },

  submit(e) {

  },

  goToCoupon(e) {
    wx.navigateTo({
      url: "/pages/coupon/coupon?mode=999&finalAllPrice=" + this.data.finalAllPrice
    })
  },

  goToBuyOrder(e) {
    wx.redirectTo({
      url: "/pages/buyorderlist/buyorderlist"
    })
  },

  translateAllPrice() {
    var allPrice = 0
    var buycar = this.data.buycar
    var allCount = 0
    var oldAllPrice = 0
    var finalAllPrice = 0.0
    var disCount = 0.0

    for (var b = 0; b < buycar.length; b++) {
      if (buycar[b].isSelect == 1) {
        allPrice = allPrice + buycar[b].count * buycar[b].finalPrice
        allCount = allCount + buycar[b].count
        if (buycar[b].type == 1) {
          oldAllPrice = oldAllPrice + buycar[b].resource.book.real_price * buycar[b].count
        } else {
          oldAllPrice = oldAllPrice + buycar[b].resource.price * buycar[b].count
        }
      }
    }

    this.setData({
      allPrice: allPrice
    })

    if (allPrice >= 18) {
      this.setData({
        postage: 0.0
      })
    } else {
      this.setData({
        postage: 6.0
      })
    }
    finalAllPrice = allPrice + this.data.postage

    if (this.data.currentSelectCoupon != undefined && this.data.currentSelectCoupon.coupon.disCount > 0) {
      finalAllPrice = finalAllPrice - this.data.currentSelectCoupon.coupon.disCount
    }

    disCount = oldAllPrice - finalAllPrice
    finalAllPrice = finalAllPrice.toFixed(2);
    this.setData({
      finalAllPrice: finalAllPrice,
      allCount: allCount,
      disCount: disCount,
      finalOldPrice: oldAllPrice
    })


  },

  goToAddress(e) {
    wx.navigateTo({
      url: "/pages/address/address?type=1"
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  back() {
    wx.navigateBack({
      delta: 1
    })
  },

  commit(e) {
    var buycar = this.data.buycar
    var address = this.data.addressObj
    var note = this.data.currentNote
    var price = this.data.finalAllPrice
    var oldPrice = this.data.finalOldPrice
    var couponId = 0
    var couponCount = 0
    var postage = this.data.postage
    var note = this.data.currentNote
    if (this.data.currentSelectCoupon != undefined && this.data.currentSelectCoupon.coupon.disCount > 0) {
      couponId = this.data.currentSelectCoupon.coupon.id
      couponCount = this.data.currentSelectCoupon.coupon.disCount
    }

    var newbuycar = new Array
    for (var b = 0; b < buycar.length; b++) {
      if (buycar[b].isSelect == 1) {
        newbuycar.push(buycar[b])
      }
    }

    if (address.name == undefined) {
      wx.showToast({
        title: '请先完善地址相关信息',
        icon: 'none'
      })
      return
    }
    var that = this
    wx.showModal({
      title: '确认订单',
      content: '请仔细确认购买商品!',
      confirmText: '确定下单',
      success: function(res) {
        if (res.cancel) {
          return
        }
        wx.request({
          url: app.globalData.baseUrl + '/v1/buyorder/build',
          data: {
            wxId: wx.getStorageSync("userId"),
            goodDatas: JSON.stringify(newbuycar),
            price: price,
            detail: address.detail,
            name: address.name,
            phone: address.phone,
            province: address.province,
            city: address.city,
            district: address.district,
            couponId: couponId,
            oldPrice: oldPrice,
            couponCount: couponCount,
            postage: postage,
            note: note
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            if (res.data.F_responseNo == 10000) {
              wx.showToast({
                title: '下单成功',
                icon: 'none'
              })
              var orderId = res.data.F_data
              //下单成功吊起支付并删除购物车对应信息
              that.translateBuycar()
              that.goToWxPay(orderId)
            } else {
              wx.showToast({
                title: '提交订单失败，请联系管理员',
                icon: 'none'
              })
            }
          },
        })
      }
    })
  },

  translateBuycar() {
    var buycar = this.data.buycar
    var newbuycar = new Array
    for (var b = 0; b < buycar.length; b++) {
      if (buycar[b].isSelect == 0) {
        newbuycar.push(buycar[b])
      }
    }

    wx.setStorageSync("buycar", newbuycar)
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
          that.goToBuyOrder()
        } else {
          wx.showToast({
            title: '更新订单状态失败，请联系管理员',
            icon: 'none'
          })
        }
      },
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
    var buycar = wx.getStorageSync('buycar')
    var address = wx.getStorageSync('address')
    for (var b = 0; b < buycar.length; b++) {
      if (buycar[b].type == 1) {
        buycar[b].resource.book.real_price = Number(buycar[b].resource.book.real_price)
      }
    }
    this.setData({
      buycar: buycar,
      addressObj: address
    })

    this.translateAllPrice()

    var selectCoupon = wx.getStorageSync('selectCoupon')
    var selectCouponStatus = wx.getStorageSync('selectCouponStatus')

    if (selectCouponStatus == 1) {
      wx.setStorageSync('selectCouponStatus', 0)
      this.setData({
        currentSelectCoupon: selectCoupon
      })

      this.translateAllPrice()
    }
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

  },

})