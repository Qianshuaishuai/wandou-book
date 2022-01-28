// pages/promotion/promotion.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    testList: ["", "", "", "", ""],
    userInfo: {},
    promotion1: [],
    promotion2: [],
    total1: 0.0,
    total2: 0.0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
    this.getPromotion1()
    this.getPromotion2()
  },

  getPromotion1() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/recommend/newlist',
      data: {
        phone: this.data.userInfo.phone,
        type: 1,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.data.F_data.length > 0) {
          var list = res.data.F_data[0].recommends
          var total1 = 0
          for (var l = 0; l < list.length; l++) {
            total1 = total1 + list[l].income
          }
          this.setData({
            promotion1: res.data.F_data[0].recommends,
            total1: total1
          })
        }

      },
    })
  },

  getPromotion2() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/recommend/newlist',
      data: {
        phone: this.data.userInfo.phone,
        type: 2,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.data.F_data.length > 0) {
          var list = res.data.F_data[0].recommends
          var total2 = 0
          for (var l = 0; l < list.length; l++) {
            total2 = total2 + list[l].income
          }
          this.setData({
            promotion2: res.data.F_data[0].recommends,
            total2: total2
          })
        }
      },
    })
  },

  post(event) {
    wx.navigateTo({
      url: '/pages/poster/poster',
    })

  },

  yeildImg: function() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        var avatarUrl = res.userInfo.avatarUrl
        var nickName = res.userInfo.nickName
        //生成海报点击事件
        if (this.data.userInfo.code == undefined || this.data.userInfo.code == "") {
          wx.showToast({
            title: '当前后台未生成你的推广码',
            icon: 'none',
            duration: 2000
          })
          return
        }
        wx.navigateTo({
          url: '/pages/poster/poster?avatarUrl=' + avatarUrl + "&name=" + nickName,
        })
      }
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