// pages/secondhand/secondhand.js
Page({

  /**
   * Page initial data
   */
  data: {
    showList:["","","",""],
    currentSearch:"",
    typeList: ["书籍", "日用品", "电子产品", "自行车", " 服饰鞋包", "书籍"],
    currentTypeIndex: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  changeIndex(event) {
    var index = Number(event.currentTarget.dataset.index)
    this.setData({
      currentTypeIndex: index,
    })
  },

  changeInput(event){
    var value = event.detail.value
    this.setData({
      currentSearch: value
    })
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