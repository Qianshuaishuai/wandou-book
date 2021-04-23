const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    inputSearch: "",
    currentMode: 0,
    currentSort: 0,
    showDatas: [],
    menuId: 0
  },

  changeMode(e) {
    var index = e.currentTarget.dataset.index
    if (this.data.currentMode == 1 && index == 1) {
      this.changeSort()
      return
    }
    this.setData({
      currentMode: index
    })
    this.getBookList()
  },

  changeSort() {
    var sort = this.data.currentSort
    if (sort == 0) {
      sort = 1
    } else {
      sort = 0

    }

    this.setData({
      currentSort: sort
    })
    this.getBookList()
  },

  goToDetail(e) {
    var index = e.currentTarget.dataset.index
    wx.setStorageSync("resource", this.data.showDatas[index])
    wx.navigateTo({
      url: "/pages/book/book?type=1"
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var word = options.word
    this.setData({
      inputSearch: word
    })
    this.getBookList()
  },

  getBookList() {
    var sortIndex = 0
    var menuId = this.data.menuId
    var search = this.data.inputSearch
    switch (Number(this.data.currentMode)) {
      case 0:
        sortIndex = 0
        break;
      case 1:
        var sort = this.data.currentSort
        if (sort == 0) {
          sortIndex = 2
        } else {
          sortIndex = 1
        }
        break;
      case 2:
        sortIndex = 3
        break;
      case 3:
        sortIndex = 4
        break
      default:
        sortIndex = 0
        break
    }
    wx.request({
      url: app.globalData.baseUrl + '/v1/good/menu/list',
      data: {
        menuId: menuId,
        sortIndex: sortIndex,
        search: search
      },
      method: 'GET',
      success: res => {
        this.setData({
          showDatas: res.data.F_data.sellBooks
        })
      },
    })
  },

  inputsearch(e) {
    this.setData({
      inputSearch: e.detail.value
    })

    this.getBookList()
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