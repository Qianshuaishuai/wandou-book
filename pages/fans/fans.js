// pages/fans/fans.js
const app = getApp()
Page({

  showPopup() {
    // this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 页面的初始数据
   */
  data: {
    fansCount: 0,
    active: 0,
    show: false,
    exclusiveFansArray: [],
    normalFansArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //从服务器拉取邀请信息的数据


    let arr1 = this.data.exclusiveFansArray;
    let arr2 = this.data.normalFansArray;
    this.setData({
      fansCount: arr1.length+arr2.length
    })

    this.getFansList()
  },

  getFansList(){
    wx.request({
      url: app.globalData.baseUrl + '/v1/recommend/list',
      data: {
        wx_id: wx.getStorageSync('userId'),
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if(res.data.F_responseNo == 10000){
          console.log(res.data.F_data[0].recommends.length)
          var fansCount = 0
          fansCount = fansCount + res.data.F_data[0].recommends.length
          fansCount = fansCount + res.data.F_data[1].recommends.length
          this.setData({
            exclusiveFansArray: res.data.F_data[0].recommends,
            normalFansArray: res.data.F_data[1].recommends,
            fansCount:fansCount
          })
        }
      },
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