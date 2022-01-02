// pages/pickschool/pickschool.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentSearch: "",
    testList: ["", "", "", "", ""],
    schoolList: []
  },

  changeSearch(event) {
    var value = event.detail.value
    this.setData({
      currentSearch: value
    })
  },

  clear() {
    this.setData({
      currentSearch: ""
    })
  },

  search(event) {
    if (this.data.currentSearch == "") {
      wx.showToast({
        title: '输入搜索内容',
        icon: 'none'
      })

      return
    }

    this.getPickSchool(this.data.currentSearch)
  },

  applymaster(event) {
    var index = Number(event.currentTarget.dataset.index);
    var school = this.data.schoolList[index]
    wx.setStorage({
      key: 'school',
      data: school,
    })
    wx.navigateTo({
      url: '/pages/masterpost/masterpost',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getPickSchool("")
  },

  selectItem(event) {
    var index = Number(event.currentTarget.dataset.index);
    var school = this.data.schoolList[index]
    wx.navigateBack({
      delta: 1
    })

    wx.setStorage({
      key: 'school',
      data: school,
    })
  },

  getPickSchool(search) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/pick/schools',
      data: {
        search: search
      },
      success: res => {
        this.setData({
          schoolList: res.data.F_data
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