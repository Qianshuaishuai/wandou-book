const app = getApp()
Page({

  phone: function() {
    // wx.makePhoneCall({
    //   phoneNumber: '12345678910',
    // })
    wx.setClipboardData({
      data: 'yuxiukeji',
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '客服微信复制成功'
            })
          }
        })
      }
    })
  },

  goToBuyOrderList(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/buyorderlist/buyorderlist?index=' + Number(index),
    })
  },

  getCouponCount() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/coupon/user/count',
      data: {
        wx_id: wx.getStorageSync("userId"),
      },
      method: 'GET',
      success: res => {
        this.setData({
          couponCount: res.data.F_data
        })
      },
    })
  },

  goToOrder(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/order/order?index=' + index,
    })
  },

  showNotice() {
    wx.showModal({
      title: '消息通知',
      content: '因寒假高峰期订单激增，审核速度有所变缓，我们在加班加点审核图书，请您耐心等待，感谢您的理解与支持',
      showCancel: false,
      success: res => {

      }
    })
  },

  goToPartner() {
    wx.navigateTo({
      url: '/pages/partner/partner',
    })
  },

  goToFans() {
    wx.navigateTo({
      url: '/pages/income/income',
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

  goToDrawal() {
    wx.navigateTo({
      url: '/pages/drawal/drawal',
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
    cash: '0.0', //余额，单位：分
    frontCash: '', //小数点前面的金额 
    behindCash: '', //小数点后面的金额
    userBalance: {},
    couponCount: 0
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

  goToCoupon() {
    wx.navigateTo({
      url: '/pages/coupon/coupon'
    })
  },

  onConfirmlogin: function() {

  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },

  /**
   * 生命周期函数--监听页面加载
   */

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        this.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
        wx.setStorageSync('wxInfo', res.userInfo)
      },
      fail: (res) => {

      }
    })
  },

  onLoad: function(options) {

    var userInfo = wx.getStorageSync('wxInfo')

    var avatarUrl = 'userInfo.avatarUrl';
    var nickName = 'userInfo.nickName';
    this.setData({
      [avatarUrl]: userInfo.avatarUrl,
      [nickName]: userInfo.nickName,
    })

    var cash = this.data.cash;
    var frontCash = cash.split(".")[0];
    this.setData({
      frontCash: frontCash
    });
    var behindCash = cash.split(".")[1];
    this.setData({
      behindCash: behindCash
    });

    var userBalance = wx.getStorageSync('userInfo')
    this.setData({
      userBalance: userBalance
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
    // wx.getSetting({
    //   success: (res) => {
    //     if (res.authSetting['scope.userInfo']) {
    //       this.setData({
    //         loginShow: false
    //       })
    //       wx.getUserInfo({
    //         success: (res) => {
    //           console.log(res.userInfo);
    //           var avatarUrl = 'userInfo.avatarUrl';
    //           var nickName = 'userInfo.nickName';
    //           this.setData({
    //             [avatarUrl]: res.userInfo.avatarUrl,
    //             [nickName]: res.userInfo.nickName,
    //           })
    //         }
    //       })
    //     } else {
    //       this.setData({
    //         loginShow: true
    //       })
    //     }
    //   }
    // })

    this.getCouponCount()
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