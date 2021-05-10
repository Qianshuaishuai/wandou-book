// pages/partner/partner.js
Page({

  yeildImg: function() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          var avatarUrl = res.userInfo.avatarUrl
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
      url: '/pages/poster/poster?avatarUrl='+avatarUrl,
    })
        }
      })
  },

  goToFans() {
    wx.navigateTo({
      url: '/pages/income/income',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imgWidth: 1080,
    imgHeight: 1920,
    showWidth: 0,
    showHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })

    var maxWidth = this.data.imgWidth
    var maxHeight = this.data.imgHeight

    var currentWidth = wx.getSystemInfoSync().windowWidth
    var currentHeight = currentWidth * maxHeight / maxWidth

    this.setData({
      showWidth: currentWidth,
      showHeight: currentHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})