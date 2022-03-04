// pages/drawal/drawal.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    countInput: "",
    count: 0,
    aliAccount: "",
    aliName: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo,
      count: Number(options.count)
    })
  },

  submit() {
    var count = this.data.count
    var wxid = wx.getStorageSync("userId")

    if (this.data.userInfo == undefined) {
      wx.showToast({
        title: '你当前未登录，前重新进入小程序!',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (count <= 0) {
      wx.showToast({
        title: '提现金额必须大于0',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.aliAccount == "") {
      wx.showToast({
        title: '请输入支付宝账户',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.aliName == "") {
      wx.showToast({
        title: '请输入支付宝真实姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.request({
      url: app.globalData.baseUrl + '/v1/user/newdrawal',
      data: {
        phone: this.data.userInfo.phone,
        count: count,
        ali_account: this.data.aliAccount,
        ali_name: this.data.aliName
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.F_responseNo == 10000) {
          wx.showModal({
            title: '提示',
            content: '已提交成功，请等待工作人员审核处理',
            showCancel: false,
            success: res => {
              wx.navigateBack({
                delta: 1
              })
            }
          })

        } else {
          if (res.data.F_responseMsg == '余额不足') {
            wx.showToast({
              title: '余额不足提现',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '提交失败，请联系管理员',
              icon: 'none',
              duration: 2000
            })
          }
        }
      },
    })
  },

  countInput: function(e) {
    this.setData({
      countInput: e.detail.value
    })
  },

  accountInput: function(e) {
    this.setData({
      aliAccount: e.detail.value
    })
  },

  nameInput: function(e) {
    this.setData({
      aliName: e.detail.value
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