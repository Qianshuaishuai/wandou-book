const app = getApp()
Page({

  phone: function() {
    // wx.makePhoneCall({
    //   phoneNumber: '12345678910',
    // })
    wx.setClipboardData({
      data: 'yuxiukeji',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  goToOrder(e){
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/order/order?index='+index,
    })
  },

  goToPartner() {
    wx.navigateTo({
      url: '/pages/partner/partner',
    })
  },

  goToFans() {
    wx.navigateTo({
      url: '/pages/fans/fans',
    })
  },

  goToQuestion() {
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },

  goToBalance() {
    wx.navigateTo({
      url: '/pages/money/money',
    })
  },

  goToRule() {
    wx.navigateTo({
      url: '/pages/rule/rule',
    })
  },

  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  logOut: function() {
    //退出登录
  },

  chooseAddress: function() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          addressInfo: res
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    loginStatus: "未登录",
    show: false,
    addressInfo: null,
    loginShow: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {
      avatarUrl: "", //用户头像0
      nickName: "", //用户昵称
    },
    statusBarHeight: app.globalData.statusBarHeight,
  },

  showPopup: function() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onCloselogin() {
    this.setData({
      loginShow: false
    });
  },

  onConfirmlogin: function() {

  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            loginShow: false
          })
          wx.getUserInfo({
            success: (res) => {
              console.log(res.userInfo);
              var avatarUrl = 'userInfo.avatarUrl';
              var nickName = 'userInfo.nickName';
              this.setData({
                [avatarUrl]: res.userInfo.avatarUrl,
                [nickName]: res.userInfo.nickName,
              })
            }
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            loginShow: false
          })
          wx.getUserInfo({
            success: (res) => {
              console.log(res.userInfo);
              var avatarUrl = 'userInfo.avatarUrl';
              var nickName = 'userInfo.nickName';
              this.setData({
                [avatarUrl]: res.userInfo.avatarUrl,
                [nickName]: res.userInfo.nickName,
              })
            }
          })
        } else {
          this.setData({
            loginShow: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})