// pages/discount/discount.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    currentIndex:0,
    testList:["","","","","",""],
    couponList:[]
  },

  changeIndex(event) {
    var index = Number(event.currentTarget.dataset.index)
    this.setData({
      currentIndex: index,
    })
  },

  back() {
    wx.navigateBack({
      delta: 1
    })
  },

  getTaobaoCouponoList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/taobaocoupon/list',
      success: res => {
        var list = res.data.F_data
        for (var l = 0;l<list.length;l++){
          switch(list[l].type){
            case 1:
              list[l].typeStr = "Taobao" 
            break

            case 2:
              list[l].typeStr = "Tianmao"
              break

            case 3:
              list[l].typeStr = "Jingdong"
              break
          }
        }
        this.setData({
          couponList: res.data.F_data
        })
      },
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getTaobaoCouponoList()
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