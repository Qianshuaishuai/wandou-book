// pages/masterregister/masterregister.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentPhone: "",
    currentVerify: "",
    showUnbindDialog: false,
    userInfo: {},
    timeCountDown: 0
  },

  changePhone(event) {
    var value = event.detail.value
    this.setData({
      currentPhone: value
    })
  },

  verify(event) {
    var currentPhone = this.data.userInfo.phone
    if (currentPhone != "") {
      wx.showToast({
        title: '你已绑定过手机,请先解帮',
        icon: 'none'
      })
      return
    }
    var phone = this.data.currentPhone
    if (phone.length != 11) {
      wx.showToast({
        title: '请填写规范的手机号码',
        icon: 'none'
      })
      return
    }

    var timeCountDown = this.data.timeCountDown
    if (timeCountDown > 0) {
      return
    }
    var that = this
    var countDown = 60
    var interval = setInterval(function() {
      //循环执行代码 
      if (countDown <= 0) {
        clearInterval(interval)
      }
      countDown = countDown - 1
      that.setData({
        timeCountDown: countDown
      })
    }, 1000)

    this.verifyCode()
  },

  verifyCode() {
    wx.request({
      url: app.globalData.baseUrl + "/v1/user/newcode",
      data: {
        phone: this.data.currentPhone
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          wx.showToast({
            title: '获取成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '获取失败,联系管理员',
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '获取失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },

  bind(event) {
    var currentPhone = this.data.userInfo.phone
    var code = this.data.currentVerify
    var phone = this.data.currentPhone
    if (currentPhone != "") {
      wx.showToast({
        title: '你已绑定过手机,请先解帮',
        icon: 'none'
      })
      return
    }
    if (code == "") {
      wx.showToast({
        title: '请填写验证码',
        icon: 'none'
      })
      return
    }
    if (phone.length != 11) {
      wx.showToast({
        title: '请填写规范的手机号码',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '正在绑定中...',
    })
    wx.request({
      url: app.globalData.baseUrl + "/v1/wx/bindphone",
      data: {
        phone: this.data.currentPhone,
        wx_id: wx.getStorageSync("userId"),
        user_type: 1,
        code: code
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          wx.setStorage({
            key: 'userInfo',
            data: res.data.F_data,
          })
          wx.showToast({
            title: '绑定成功',
            icon: 'none'
          })
          var isRecommend = wx.getStorageSync("isRecommend")

          if (isRecommend == 0) {
            var isRecommendId = wx.getStorageSync("isRecommendId")
            if (res.data.F_data.openid != isRecommendId) {
              wx.request({
                url: this.globalData.baseUrl + '/v1/recommend/newdo',
                data: {
                  phone: isRecommendId,
                  rphone: this.data.currentPhone,
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: res => {
                  setTimeout(function() {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000);
                  wx.setStorageSync("isRecommend", 1)
                },
              })
            }
          } else {
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000);
          }
        } else {
          wx.showToast({
            title: res.data.F_responseMsg,
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '绑定失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },

  changeVerify(event) {
    var value = event.detail.value
    this.setData({
      currentVerify: value
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
  },

  unbind(event) {
    this.setData({
      showUnbindDialog: true
    })
  },

  closeDialog(event) {
    this.setData({
      showUnbindDialog: false
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