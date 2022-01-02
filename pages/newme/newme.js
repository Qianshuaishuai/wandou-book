// pages/newme/newme.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    wxUserInfo: {},
    hasUserInfo: false,
    school: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  goToOrder(e) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/order/order?index=' + index,
    })
  },

  releaseErrand(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/errandlist/errandlist',
    })
  },

  takeErrand(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/takeerrand/takeerrand',
    })
  },

  drawal(event) {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/newdrawal/newdrawal',
    })
  },

  masterlogin() {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/masterlogin/masterlogin',
    })
  },

  applyMaster() {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }

    if (this.data.userInfo.schoolMaster > 0) {
      wx.showToast({
        title: '你已是校园站长',
        icon: 'none'
      })
      return
    }

    if (this.data.school.name == "" || this.data.school.name == undefined) {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/masterpost/masterpost',
    })
  },

  goToBindPhone() {
    wx.navigateTo({
      url: '/pages/masterregister/masterregister',
    })
  },

  copyWechat() {
    wx.showToast({
      title: '复制客服微信成功',
      icon: 'none'
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于显示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          wxUserInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorage({
          key: 'wxUserInfo',
          data: res.userInfo,
        })
      }
    })
  },

  goToPartner() {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/promotion/promotion',
    })
  },

  goToAddress() {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/myaddress/myaddress',
    })
  },

  goToManager() {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/secondhandmanager/secondhandmanager',
    })
  },

  goToSell() {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/addsecondhand/addsecondhand',
    })
  },

  goToBuy() {
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/secondhand/secondhand',
    })
  },

  goToQuestion() {
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },

  goToNewIncome() {
    if (this.data.userInfo.schoolMaster == 0) {
      wx.showToast({
        title: '你当前不是校园站长无法查看',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/newincome/newincome',
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
    var school = wx.getStorageSync('school')
    var userInfo = wx.getStorageSync('userInfo')
    var wxUserInfo = wx.getStorageSync('wxUserInfo')
    this.setData({
      userInfo: userInfo,
      wxUserInfo: wxUserInfo,
      school: school
    })

    if (wxUserInfo.nickName != "") {
      var nickName = wxUserInfo.nickName
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

    // if (userInfo.phone == '') {
    //   wx.showToast({
    //     title: '请先绑定手机',
    //     icon: 'none'
    //   })
    //   setTimeout(function () {
    //     wx.navigateTo({
    //       url: '/pages/masterregister/masterregister',
    //     })
    //   }, 500);
    // }
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