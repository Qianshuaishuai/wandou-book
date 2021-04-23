// pages/school/school.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    schoolList:[],
    inputSearch:""
  },

  goToDetail(e) {
    var schoolIndex = e.currentTarget.dataset.schoolindex
    var bookIndex = e.currentTarget.dataset.bookindex
    wx.setStorageSync("resource", this.data.schoolList[schoolIndex].schoolBooks[bookIndex])
    wx.navigateTo({
      url: "/pages/book/book?type=1"
    })
  },

  changeInput(e) {
    this.setData({
      inputSearch: e.detail.value
    })

    this.getSchoolList()
  },

  getSchoolList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/good/school/list',
      data: {
        search: this.data.inputSearch
      },
      method: 'GET',
      success: res => {
       this.setData({
         schoolList:res.data.F_data
       })
        console.log(this.data.schoolList)
      },
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getSchoolList();
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