// pages/coupon/coupon.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentType: 0,
    couponTestDatas: ["../../assets/new-images/index/type5.png", "", ""],
    showGetDetail: false,
    couponData: [],
    pickerCoupon: {},
    pickerSelectCount: 0,
    pickerAllCount: 0,
    couponPickerDatas: [],
    mode: 0,
    finalAllPrice: 0.0,
    wxid: wx.getStorageSync("userId"),
  },

  changeType(e) {
    this.setData({
      currentType: e.currentTarget.dataset.index
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var mode = options.mode
    var finalAllPrice = options.finalAllPrice
    this.setData({
      mode: mode,
      finalAllPrice: finalAllPrice
    })
    this.getCouponList()
  },

  pickerCoupon(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      showGetDetail: true,
      pickerCoupon: this.data.couponData[index]
    })

    this.getPickerCouponList(this.data.couponData[index].coupon.id)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  getCouponList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/coupon/wx/list',
      data: {
        wx_id: wx.getStorageSync("userId"),
      },
      success: res => {
        this.setData({
          couponData: res.data.F_data
        })
      },
    })
  },

  goToRule(e) {
    this.doCouponPicker()
  },

  doCouponPicker() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/coupon/picker/do',
      data: {
        wx_id: wx.getStorageSync("userId"),
        coupon_id: 3,
        picker_pic: "../../assets/new-images/index/type5.png",
        picker_id: "asdads"
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
      }
    })
  },

  getPickerCouponList(couponId) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/coupon/picker/list',
      data: {
        wx_id: wx.getStorageSync("userId"),
        coupon_id: couponId
      },
      success: res => {
        var pickerData = res.data.F_data
        var couponPickerDatas = new Array
        for (var p = 0; p < pickerData.length; p++) {
          couponPickerDatas.push(pickerData[p].picker_pic)
        }

        if (couponPickerDatas.length < 3) {
          var max = 3 - couponPickerDatas.length
          for (var a = 0; a < max; a++) {
            couponPickerDatas.push("")
          }
        }

        this.setData({
          couponPickerDatas: couponPickerDatas,
          pickerSelectCount: pickerData.length,
          pickerAllCount: 3,
        })
      },
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  closeGetDetail() {
    this.setData({
      showGetDetail: false,
    })
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
    return {
      title: '快来助力我领取优惠券吧！',
      path: '/pages/newindex/newindex?wx_id=' + this.data.wxid + '&coupon_id=' + this.data.pickerCoupon.coupon.id,
    }
  },

  useCoupon(e) {
    var index = e.currentTarget.dataset.index
    var mode = this.data.mode
    var coupons = this.data.couponData
    var selectCoupon = coupons[index]
    var finalAllPrice = this.data.finalAllPrice

    if (mode == 999) {
      if (selectCoupon.status != 1) {
        switch (selectCoupon.status) {
          case -1:
            wx.showToast({
              title: '当前优惠券还未领取成功',
              icon: 'none'
            })
            break
          case -2:
            wx.showToast({
              title: '当前优惠券已过期',
              icon: 'none'
            })
            break
          case 999:
            wx.showToast({
              title: '当前优惠券你已使用过',
              icon: 'none'
            })
            break
        }
        return
      }
      if (finalAllPrice < selectCoupon.coupon.fullAmount) {
        wx.showToast({
          title: '当前订单价格未满足优惠条件',
          icon: 'none'
        })
        return
      }

      wx.navigateBack({
        delta: 1
      })

      wx.setStorageSync('selectCoupon', selectCoupon)
      wx.setStorageSync('selectCouponStatus', 1)
    }
  }
})