// pages/newincome/newincome.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    schoolId: 0,
    school: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.setData({
      schoolId: options.schoolId
    })

    this.getPickSchool()
  },

  getPickSchool() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/pick/show',
      data: {
        id: this.data.schoolId
      },
      method: 'GET',
      success: res => {
        this.setData({
          school: res.data.F_data
        })

        if (this.data.school.id == 0) {
          wx.showToast({
            title: '获取当前学校收益失败',
            icon: 'none'
          })

          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        }
      },
      failed: res => {
        wx.showToast({
          title: '获取当前学校收益失败',
          icon: 'none'
        })

        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 1000);
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