// pages/newindex2/newindex2.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    testList: ["", "", "", "", ""],
    background: ['https://resource.qimsj.com/wandou/banner1.png', 'https://resource.qimsj.com/wandou/banner2.png', 'https://resource.qimsj.com/wandou/banner3.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2500,
    duration: 500,
    tweetList: [],
    school: "",
    userInfo: {}
  },

  swiperClick(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    var index = Number(event.currentTarget.dataset.index)
    var url = ""
    switch (index) {
      case 0:
        url = '/pages/errandindex/errandindex'
        break
      case 1:
        url = '/pages/certrider/certrider'
        break
      case 2:
        wx.showToast({
          title: '暂未开放',
          icon: 'none'
        })
        return
        url = '/pages/newcoupon/newcoupon'
        break
    }

    wx.navigateTo({
      url: url,
    })
  },

  getTweetList() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/tweet/list',
      success: res => {
        this.setData({
          tweetList: res.data.F_data
        })
      },
    })
  },

  readTweetList(id) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/tweet/read',
      data: {
        wxid: wx.getStorageSync("userId"),
        id: id
      },
      method: 'POST',
      success: res => {
        console.log(res)
      },
    })
  },

  goToSecondIndex(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/secondhandindex/secondhandindex',
    })
  },

  goToDiscount(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/discount/discount',
    })
  },

  goToSchool(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pickschool/pickschool',
    })
  },

  goToSellbook(event) {
    wx.switchTab({
      url: '/pages/newsellbook/newsellbook',
    })
  },

  goTolease(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/lease/lease',
    })
  },


  goToErrand(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/errandindex/errandindex',
    })
  },

  goToStudyCar(){
    wx.showToast({
      title: '站长未入驻，暂不开放',
      icon: 'none'
    })
    return
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getTweetList()

    // if (options.scene) {
    //   var rwxid = wx.getStorageSync("userId")

    //   if (rwxid && rwxid != "" && rwxid != options.scene) {
    //     wx.request({
    //       url: app.globalData.baseUrl + '/v1/recommend/do',
    //       data: {
    //         wx_id: options.scene,
    //         rwx_id: rwxid,
    //       },
    //       method: 'POST',
    //       header: {
    //         'content-type': 'application/x-www-form-urlencoded'
    //       },
    //       success: res => {
    //         console.log(res)
    //       },
    //     })
    //   }


    // }

    if (options.scene != "") {
      wx.setStorageSync("isRecommend", 0)
      wx.setStorageSync("isRecommendId", options.scene)
    }

    // app.getWxUserInfo().then(res => {
    //   wx.getUserInfo({
    //     success: res => {
    //       var nickName = res.userInfo.nickName
    //       var wxid = wx.getStorageSync("userId")

    //       wx.request({
    //         url: app.globalData.baseUrl + '/v1/wx/name',
    //         data: {
    //           wx_id: wxid,
    //           name: nickName,
    //         },
    //         method: 'POST',
    //         header: {
    //           'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         success: res => {
    //           console.log(res)
    //         },
    //       })
    //     }
    //   })
    // }).catch(e => {
    //   // 打印一下错误
    //   console.log(JSON.stringify(e) + "+++++++")
    // })
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
    var userInfo = wx.getStorageSync('userInfo')
    var school = wx.getStorageSync('school')
    this.setData({
      school: school,
      userInfo: userInfo
    })
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