// pages/drawal/drawal.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    countInput:""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
  },

  submit(){
    var count = this.data.countInput
    var wxid = wx.getStorageSync("userId")

    if (this.data.userInfo == undefined || this.data.userInfo.balance == undefined){
      wx.showToast({
        title: '你当前未登录，前重新进入小程序!',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if(count <= 0){
      wx.showToast({
        title: '提现金额必须大于0',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.request({
      url: app.globalData.baseUrl + '/v1/user/drawal',
      data: {
        wx_id: wxid,
        count: count,
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
          if (res.data.F_responseMsg == '余额不足'){
            wx.showToast({
              title: '余额不足提现',
              icon: 'none',
              duration: 2000
            })
          }else{
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

  countInput: function (e) {
    this.setData({
      countInput: e.detail.value
    })
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