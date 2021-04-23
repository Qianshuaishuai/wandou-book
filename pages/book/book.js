// pages/book/book.js
Page({

  /**
   * Page initial data
   */
  data: {
    chooseIndex: 0,
    showStatus: 0,
    buyCount: 1,
    showData: {},
    showType: 1,
  },

  goToBuycar() {
    wx.switchTab({
      url: "/pages/buycar/buycar"
    })
  },

  goToPartner() {
    wx.navigateTo({
      url: '/pages/partner/partner',
    })
  },

  goToCoupon(e) {
    wx.navigateTo({
      url: "/pages/coupon/coupon"
    })
  },

  confirm(e) {
    wx.showToast({
      title: '添加成功',
      icon: 'none',
    })
    
    this.setData({
      showStatus: 0
    })

    var buycar = wx.getStorageSync("buycar")
    var newBuycar = this.getBuyCarObject();

    if (!buycar) {
      buycar = new Array;
    }

    var isHave = 0;

    if (this.data.showType == 1) {
      newBuycar.count = this.data.buyCount
      newBuycar.type = Number(this.data.showType)
      newBuycar.quality = Number(this.data.chooseIndex)
      newBuycar.finalPrice = this.data.showData.sellBooks[this.data.chooseIndex].sellPrice
      newBuycar.resource = this.data.showData

      for (var b = 0; b < buycar.length; b++) {
        if (buycar[b].type == 1) {
          if (this.data.showData.book.id == buycar[b].resource.book.id && buycar[b].quality == Number(this.data.chooseIndex)) {
            buycar[b].count = buycar[b].count + this.data.buyCount
            isHave = 1
          }
        }

      }
    } else {
      newBuycar.count = this.data.buyCount
      newBuycar.type = Number(this.data.showType)
      newBuycar.finalPrice = this.data.showData.sellPrice
      newBuycar.resource = this.data.showData

      for (var b = 0; b < buycar.length; b++) {
        if (buycar[b].type == 2) {
          if (this.data.showData.id == buycar[b].resource.id) {
            buycar[b].count = buycar[b].count + this.data.buyCount

            isHave = 1
          }
        }

      }

    }

    if (isHave == 0) {
      buycar.push(newBuycar)
    }
    console.log(buycar)
    wx.setStorageSync("buycar", buycar)
  },

  getBuyCarObject() {
    var object = new Object;
    object.count = 0
    object.type = 0
    object.quality = 0
    object.resource = new Object
    object.finalPrice = 0.0
    object.isSelect = 1
    return object
  },

  closeShow() {
    this.setData({
      showStatus: 0
    })
  },

  goToBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  buy(e) {
    this.setData({
      showStatus: 1
    })
  },

  add(e) {
    var count = this.data.buyCount;
    count = count + 1
    this.setData({
      buyCount: count
    })
  },

  reduce(e) {
    var count = this.data.buyCount;
    if (count > 1) {
      count = count - 1
      this.setData({
        buyCount: count
      })
    }
  },

  close(e) {
    this.setData({
      showStatus: 0
    })
  },

  changeChooseIndex(e) {
    this.setData({
      chooseIndex: e.currentTarget.dataset.index
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var showData = wx.getStorageSync("resource")
    var type = options.type
    var isSpecial = options.isSpecial

    if (type != 0) {
      this.setData({
        showType: type,
        showData: showData
      })
    }

    if (isSpecial == 1) {
      for (var a = 0; a < showData.sellBooks.length; a++) {
        showData.sellBooks[a].sellPrice = 4.9
      }

      this.setData({
        showData: showData
      })
    }
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
  onShareAppMessage: function () {
    return {
      title: '快来豌豆商城买书吧！',
      path: '/pages/newindex/newindex',
    }
  },
})