// pages/newindex/newindex.js
Page({

  /**
   * Page initial data
   */

  data: {
    inputSearch: "",
    hotWords: ["代数", "经济学", "代数", "课课通", "绘本"],
    typeDatas: [{
      "title": "优惠券",
      "icon": "../../assets/new-images/index/type1.png"
    }, {
      "title": "4.9元专区",
      "icon": "../../assets/new-images/index/type2.png"
    }, {
      "title": "宿舍好物",
      "icon": "../../assets/new-images/index/type3.png"
    }, {
      "title": "优教材",
      "icon": "../../assets/new-images/index/type4.png"
    }, {
      "title": "高校书单",
      "icon": "../../assets/new-images/index/type5.png"
    }],
    testDatas: [{
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
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    background: ['assets/images/1.jpg', 'assets/images/2.jpg', 'assets/images/3.jpg'],
    hotBookList: [],
    imgWidth: 1080,
    imgHeight: 1920,
    showWidth: 0,
    showHeight: 0,
  },

  inputsearch(e) {
    this.setData({
      inputSearch: e.detail.value
    })
  },

  goToCoupon: function () {
    wx.navigateTo({
      url: "/pages/coupon/coupon"
    })
  },

  goToPartner() {
    wx.navigateTo({
      url: '/pages/partner/partner',
    })
  },

  goToSpecial: function () {
    wx.navigateTo({
      url: "/pages/4.9special/4.9special"
    })
  },

  goToBook: function () {
    wx.navigateTo({
      url: "/pages/book/book"
    })
  },

  goToSchool: function () {
    wx.navigateTo({
      url: "/pages/school/school"
    })
  },

  goToGoodThings: function () {
    wx.navigateTo({
      url: "/pages/goodthings/goodthings"
    })
  },

  goToType(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.goToCoupon()
    } else if (index == 1) {
      this.goToSpecial()
    } else if (index == 2) {
      this.goToGoodThings()
    } else if (index == 3) {

    } else if (index == 4) {
      this.goToSchool()
    }
  },

  goToSpecail3(e) {
    var index = e.currentTarget.dataset.index
  },

  goToSpecail2(e) {
    var index = e.currentTarget.dataset.index
  },

  goToSpecail1(e) {
    var index = e.currentTarget.dataset.index
  },

  goToSpecailMore1() {

  },

  goToSpecailMore2() {

  },

  goToSpecailMore3() {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (options.scene) {
      var rwxid = wx.getStorageSync("userId")

      if (rwxid && rwxid != "" && rwxid != options.scene) {
        wx.request({
          url: app.globalData.baseUrl + '/v1/recommend/do',
          data: {
            wx_id: options.scene,
            rwx_id: rwxid,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            console.log(res)
          },
        })
      }


    }

    app.getWxUserInfo().then(res => {
      wx.getUserInfo({
        success: res => {
          console.log(res)
          var nickName = res.userInfo.nickName
          var wxid = wx.getStorageSync("userId")

          wx.request({
            url: app.globalData.baseUrl + '/v1/wx/name',
            data: {
              wx_id: wxid,
              name: nickName,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              console.log(res)
            },
          })
        }
      })
    }).catch(e => {
      // 打印一下错误
      console.log(JSON.stringify(e) + "+++++++")
    })

    var maxWidth = this.data.imgWidth
    var maxHeight = this.data.imgHeight

    var currentWidth = wx.getSystemInfoSync().windowWidth
    var currentHeight = currentWidth * maxHeight / maxWidth

    this.setData({
      showWidth: currentWidth,
      showHeight: currentHeight
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
  hotBook: function () {
    wx.navigateTo({
      url: '/pages/hotBookRank/hotBookRank',
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    // 用户触发了下拉刷新操作

    // 拉取新数据重新渲染界面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() // 可以停止当前页面的下拉刷新

  },

  joinPartner: function () {
    wx.navigateTo({
      url: "/pages/partner/partner"
    })
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