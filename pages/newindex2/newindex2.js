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
    userInfo: {},
    showUnbindDialog: false,
  },

  swiperClick(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请到我的-绑定手机',
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
        url = '/pages/discount/discount'
        break
      default:
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

  goToDetail(event) {
    var showTime = wx.getStorageSync('showTime')
    var date2 = new Date();
    wx.setStorageSync("showTime", date2)
    var date3 = date2.getTime() - new Date(showTime).getTime();

    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    if (minutes > 1 || showTime == '') {
      wx.requestSubscribeMessage({
        tmplIds: ['ur-7dxigeVUPmNTzzIOfwfk5SGr4_LVX3R-6TRJehSw'],
        success(res) {
     
        },
        fail(res) {
          console.log(res)
        }
      })
    }

    var index = Number(event.currentTarget.dataset.index)

    wx.navigateTo({
      url: '/pages/webview/webview?index=' + index,
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
    // if (this.data.userInfo.phone == "") {
    //   wx.showToast({
    //     title: '请到我的-绑定手机',
    //     icon: 'none'
    //   })
    //   return
    // }

    if (this.data.school.isBind == 0) {
      wx.showToast({
        title: '目前此学校暂无站长入驻',
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
        title: '请到我的-绑定手机',
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
        title: '请到我的-绑定手机',
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

    var showTime = wx.getStorageSync('showTime')
    var date2 = new Date();
    wx.setStorageSync("showTime", date2)
    var date3 = date2.getTime() - new Date(showTime).getTime();

    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    if (minutes > 1 || showTime == '') {
      wx.requestSubscribeMessage({
        tmplIds: ['ur-7dxigeVUPmNTzzIOfwfk5SGr4_LVX3R-6TRJehSw'],
        success(res) {
  
        },
        fail(res) {
          console.log(res)
        }
      })
    }
  },

  goTolease(event) {
    // if (this.data.userInfo.phone == "") {
    //   wx.showToast({
    //     title: '请到我的-绑定手机',
    //     icon: 'none'
    //   })
    //   return
    // }


    var showTime = wx.getStorageSync('showTime')
    var date2 = new Date();
    wx.setStorageSync("showTime", date2)
    var date3 = date2.getTime() - new Date(showTime).getTime();

    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    if (minutes > 1 || showTime == '') {
      wx.requestSubscribeMessage({
        tmplIds: ['ur-7dxigeVUPmNTzzIOfwfk5SGr4_LVX3R-6TRJehSw'],
        success(res) {
   
        },
        fail(res) {
          console.log(res)
        }
      })
    }

    if (this.data.school.isBind == 0) {
      wx.showToast({
        title: '目前此学校暂无站长入驻',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/lease/lease',
    })
  },


  goToErrand(event) {
    // if (this.data.userInfo.phone == "") {
    //   wx.showToast({
    //     title: '请到我的-绑定手机',
    //     icon: 'none'
    //   })
    //   return
    // }

    // wx.requestSubscribeMessage({
    //   tmplIds: ['ur-7dxigeVUPmNTzzIOfwfk5SGr4_LVX3R-6TRJehSw'],
    //   success(res) {
    //     console.log(res)
    //    }
    // })

    // return

    var showTime = wx.getStorageSync('showTime')
    var date2 = new Date();
    wx.setStorageSync("showTime", date2)
    var date3 = date2.getTime() - new Date(showTime).getTime();

    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    if (minutes > 1 || showTime == '') {
      wx.requestSubscribeMessage({
        tmplIds: ['ur-7dxigeVUPmNTzzIOfwfk5SGr4_LVX3R-6TRJehSw'],
        success(res) {
     
        },
        fail(res) {
          console.log(res)
        }
      })
    }

    if (this.data.school.isBind == 0) {
      wx.showToast({
        title: '目前此学校暂无站长入驻',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/errandindex/errandindex',
    })
  },

  goToStudyCar() {


    var showTime = wx.getStorageSync('showTime')
    var date2 = new Date();
    wx.setStorageSync("showTime", date2)
    var date3 = date2.getTime() - new Date(showTime).getTime();

    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    if (minutes > 1 || showTime == '') {
      wx.requestSubscribeMessage({
        tmplIds: ['ur-7dxigeVUPmNTzzIOfwfk5SGr4_LVX3R-6TRJehSw'],
        success(res) {
        
        },
        fail(res) {
          console.log(res)
        }
      })
    }

    var school = wx.getStorageSync('school')
    if (school == undefined || school.id == undefined || school.id == 0) {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
      return
    }

    // if (school.isBind == 1) {
    //   wx.showToast({
    //     title: '站长未入驻，暂不开放',
    //     icon: 'none'
    //   })
    //   return
    // }

    // if (school.posterUrl == "") {
    //   wx.showToast({
    //     title: '该学校暂无驾照宣传海报，敬请期待',
    //     icon: 'none'
    //   })
    //   return
    // }
    wx.navigateTo({
      url: '/pages/car/car',
    })
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
    this.setData({
      userInfo: userInfo
    })

    // if (userInfo.phone == '') {
    //   wx.showToast({
    //     title: '请到我的-绑定手机',
    //     icon: 'none'
    //   })
    //   setTimeout(function() {
    //     wx.navigateBack({
    //       delta: 1
    //     })
    //   }, 500);
    // }
    var school = wx.getStorageSync('school')
    this.setData({
      school: school
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