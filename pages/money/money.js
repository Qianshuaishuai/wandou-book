// pages/money/money.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cash: '0.0', //余额，单位：分
    frontCash: '', //小数点前面的金额 
    behindCash: '', //小数点后面的金额
    userInfo: {}
  },

  drawal() {
    wx.navigateTo({
      url: '/pages/drawal/drawal',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var cash = this.data.cash;
    var frontCash = cash.split(".")[0];
    this.setData({
      frontCash: frontCash
    });
    var behindCash = cash.split(".")[1];
    this.setData({
      behindCash: behindCash
    });

    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
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
    console.log("onShow")
    wx.request({
      url: app.globalData.baseUrl + '/v1/wx/login',
      data: {
        wx_id: wx.getStorageSync("userId"),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.setStorage({
          key: 'userInfo',
          data: res.data.F_data,
        })
        this.setData({
          userInfo: res.data.F_data
        })
      },
    })
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