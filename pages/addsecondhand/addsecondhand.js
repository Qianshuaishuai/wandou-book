// pages/addsecondhand/addsecondhand.js
Page({

  /**
   * Page initial data
   */
  data: {
    typeList: [{
      "id": 1,
      "name": "书籍"
    }, {
      "id": 2,
      "name": "日用品"
    }, {
      "id": 3,
      "name": "电子产品"
    }, {
      "id": 4,
      "name": "自行车"
    }, {
      "id": 5,
      "name": "服饰鞋包"
    }, {
      "id": 6,
      "name": "电动车"
    }, {
      "id": 7,
      "name": "其他"
    }],
    currentTypeindex: 0,
    currentWechat: "",
    currentAddress: "",
    currentAmount: 0,
    currentReason: "",
    currentPhotos: ["", "", ""],
  },

  changeType(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentTypeindex: index
    })
  },

  changeAddress(event) {
    var value = event.detail.value
    this.setData({
      currentAddress: value
    })
  },

  changeAmount(event) {
    var value = Number(event.detail.value)
    this.setData({
      currentAmount: value
    })
  },

  changeWechat(event) {
    var value = event.detail.value
    this.setData({
      currentWechat: value
    })
  },

  changeReason(event) {
    var value = event.detail.value
    this.setData({
      currentReason: value
    })
  },

  //发布
  release() {
    if (this.data.currentReason == '') {
      wx.showToast({
        title: '请填写理由',
        icon: 'none'
      })
      return
    }

    if (this.data.currentAddress == '') {
      wx.showToast({
        title: '请填写地点',
        icon: 'none'
      })
      return
    }

    if (this.data.currentWechat == '') {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'none'
      })
      return
    }

    if (this.data.currentReason == '') {
      wx.showToast({
        title: '请填写理由',
        icon: 'none'
      })
      return
    }


    if (Number(this.data.currentAmount) > 0) {
      wx.showToast({
        title: '金额必须大于0',
        icon: 'none'
      })
      return
    }
  },

  create() {

  },

  deletePhoto(event) {
    var index = Number(event.currentTarget.dataset.index)
    var photoList = this.data.currentPhotos
    photoList.splice(index, 1)
    this.setData({
      currentPhotos: photoList
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

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