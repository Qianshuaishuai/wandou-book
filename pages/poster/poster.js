// pages/poster/poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userWxInfo: {
      avatarUrl: "", //用户头像0
      nickName: "", //用户昵称
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })

    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            loginShow: false
          })
          wx.getUserInfo({
            success: (res) => {
              console.log(res.userInfo);
              var avatarUrl = 'userWxInfo.avatarUrl';
              var nickName = 'userWxInfo.nickName';
              this.setData({
                [avatarUrl]: res.userInfo.avatarUrl,
                [nickName]: res.userInfo.nickName,
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})