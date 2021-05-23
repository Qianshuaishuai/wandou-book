// pages/track/track.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    tracks: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

    var orderNo = options.orderno;
    var wllnumber = options.wllnumber;
    var wlnumber = options.wlnumber;

    if (wlnumber.indexOf("JDV") != -1) {
      this.getTrackDatail2(wlnumber)
    }else{
      if (options.orderNo) {
        this.getTrackDatail(options.orderNo)
      }
    }
  },

  getTrackDatail2(wlNumber) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/order/track2',
      data: {
        wlNumber: wlNumber,
      },
      method: 'GET',
      success: res => {
        this.setData({
          tracks: res.data.F_data.jingdong_trace_dynamicQueryService_queryDynamicTraceInfo_responce.response.data
        })
      },
    })
  },


  getTrackDatail(orderNo) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/order/track',
      data: {
        orderNo: orderNo,
      },
      method: 'GET',
      success: res => {
        this.setData({
          tracks: res.data.F_data.jingdong_eclp_co_gotoB2BSWbMainAllTrack_responce.CoCreateLwbResult_result.b2bLwbTrack
        })
      },
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