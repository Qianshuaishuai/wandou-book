// pages/buycar/buycar.js
Page({

  /**
   * Page initial data
   */
  data: {
    testDatas: [{
      "title": "测试书本测试书本测试书本测试书本测试书本",
      "icon": "../../assets/new-images/index/test.png",
      "oPrice": "10.00",
      "nPrice": "4.00"
    }, {
      "title": "测试书本",
      "icon": "../../assets/new-images/index/test.png",
      "oPrice": "10.00",
      "nPrice": "4.00"
    }, {
      "title": "测试书本",
      "icon": "../../assets/new-images/index/test.png",
      "oPrice": "10.00",
      "nPrice": "4.00"
    }, {
      "title": "测试书本",
      "icon": "../../assets/new-images/index/test.png",
      "oPrice": "10.00",
      "nPrice": "4.00"
    }, {
      "title": "测试书本",
      "icon": "../../assets/new-images/index/test.png",
      "oPrice": "10.00",
      "nPrice": "4.00"
    }, {
      "title": "测试书本",
      "icon": "../../assets/new-images/index/test.png",
      "oPrice": "10.00",
      "nPrice": "4.00"
    }, {
      "title": "测试书本",
      "icon": "../../assets/new-images/index/test.png",
      "oPrice": "10.00",
      "nPrice": "4.00"
    }, {
      "title": "测试书本",
      "icon": "../../assets/new-images/index/test.png",
      "oPrice": "10.00",
      "nPrice": "4.00"
    }, {
      "title": "测试书本",
      "icon": "../../assets/new-images/index/test.png",
      "oPrice": "10.00",
      "nPrice": "4.00"
    }],

    buycar: [],
    isAllSelect: 0,
    allPrice: 0.0,
    qualitys: ["一般", "全新", "良好"],
    pickerIndex: 0,
  },

  bindPickerChange(e) {
    var pickerIndex = this.data.pickerIndex
    var qualityIndex = Number(e.detail.value)
    var buycar = this.data.buycar
    buycar[pickerIndex].quality = qualityIndex
    buycar[pickerIndex].finalPrice = buycar[pickerIndex].resource.sellBooks[qualityIndex].sellPrice

    this.setData({
      buycar: buycar
    })

    this.translateAllPrice();
  },

  doAllSelect() {
    var isAllSelect = this.data.isAllSelect
    var buycar = this.data.buycar
    if (isAllSelect == 0) {
      isAllSelect = 1

      for (var b = 0; b < buycar.length; b++) {
        buycar[b].isSelect = 1
      }
    } else {
      isAllSelect = 0
      for (var b = 0; b < buycar.length; b++) {
        buycar[b].isSelect = 0
      }
    }

    this.setData({
      isAllSelect: isAllSelect,
      buycar: buycar
    })

    this.translateAllPrice();
  },

  showSelectQuality(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      pickerIndex: index
    })
  },

  translateAllPrice() {
    var allPrice = 0
    var buycar = this.data.buycar

    for (var b = 0; b < buycar.length; b++) {
      if (buycar[b].isSelect == 1) {
        allPrice = allPrice + buycar[b].count * buycar[b].finalPrice
      }
    }

    allPrice = allPrice.toFixed(2);

    this.setData({
      allPrice: allPrice
    })

    wx.setStorageSync("buycar", buycar)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  reduce(e) {
    var index = e.currentTarget.dataset.index
    var buycar = this.data.buycar
    var count = buycar[index].count

    if (count == 1) {
      return
    }

    count = count - 1
    buycar[index].count = count

    this.setData({
      buycar: buycar
    })

    this.translateAllPrice();
  },

  add(e) {
    var index = e.currentTarget.dataset.index
    var buycar = this.data.buycar
    var count = buycar[index].count

    count = count + 1
    buycar[index].count = count

    this.setData({
      buycar: buycar
    })

    this.translateAllPrice();
  },

  delete(e) {
    var index = e.currentTarget.dataset.index
    var buycar = this.data.buycar

    buycar.splice(index, 1)

    this.setData({
      buycar: buycar
    })

    this.translateAllPrice();
  },

  goToCoupon(e) {
    wx.navigateTo({
      url: "/pages/coupon/coupon"
    })
  },

  goToBuyorder(e) {
    var price = this.data.allPrice
    if(price<=0.0){
      wx.showToast({
        title: '请先选择需要购买的商品',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: "/pages/buyorder/buyorder"
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
    var buycar = wx.getStorageSync('buycar')
    for (var b = 0; b < buycar.length; b++) {
      if (buycar[b].type == 1) {
        buycar[b].resource.book.real_price = Number(buycar[b].resource.book.real_price)
      }
    }
    this.setData({
      buycar: buycar
    })
    console.log(this.data.buycar)
    this.translateAllPrice();
  },

  changeSelect(e) {
    var index = e.currentTarget.dataset.index
    var buycar = this.data.buycar

    if (buycar[index].isSelect == 0) {
      buycar[index].isSelect = 1
    } else {
      buycar[index].isSelect = 0
    }

    this.setData({
      buycar: buycar
    })

    this.translateAllPrice();
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