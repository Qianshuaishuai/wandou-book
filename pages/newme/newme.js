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
    school: {},
    master: {
      id: 0
    },
    showUnbindDialog: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  goToOrder(e) {

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
    // if (this.data.userInfo.phone == "") {
    //   wx.showToast({
    //     title: '请先绑定手机',
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
      url: '/pages/errandlist/errandlist',
    })
  },

  goToMyContract() {
    wx.showToast({
      title: '开发中,请微信或电话沟通',
      icon: 'none'
    })
    return
    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      return
    }
    // wx.navigateTo({
    //   url: '/pages/message/message',
    // })
  },

  takeErrand(event) {
    // if (this.data.userInfo.phone == "") {
    //   wx.showToast({
    //     title: '请先绑定手机',
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
    // wx.showToast({
    //   title: '复制客服微信成功',
    //   icon: 'none'
    // })
    this.setData({
      showUnbindDialog: true,
    })

  },

  savePhoto() {
    var url = "https://resource.qimsj.com/wandou5.jpeg"
    // 通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope

    var that = this

    wx.showLoading({
      title: '正在保存中',
    })

    wx.downloadFile({
      url: url,
      success: function(res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res);
            wx.showToast({
              title: "保存成功",
              duration: 2000
            })
          },
          fail(res) {
            console.log(res);
          },
          complete(res) {
            console.log(res);
            wx.hideLoading()
          }
        })
      }
    })
  },

  closeDialog(event) {
    this.setData({
      showUnbindDialog: false,
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
    // if (this.data.userInfo.phone == "") {
    //   wx.showToast({
    //     title: '请先绑定手机',
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
      url: '/pages/secondhandmanager/secondhandmanager',
    })
  },

  goToSell() {
    // if (this.data.userInfo.phone == "") {
    //   wx.showToast({
    //     title: '请先绑定手机',
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
      url: '/pages/addsecondhand/addsecondhand',
    })
  },

  goToBuy() {
    // if (this.data.userInfo.phone == "") {
    //   wx.showToast({
    //     title: '请先绑定手机',
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
      url: '/pages/newincome/newincome?schoolId=' + this.data.userInfo.schoolMaster,
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
    var wxUserInfo = wx.getStorageSync('wxUserInfo')
    var master = wx.getStorageSync('master')
    this.setData({
      wxUserInfo: wxUserInfo,
      school: school,
    })

    if (master.id != 0 && master.id != undefined) {
      this.setData({
        master: master
      })
    }

    wx.request({
      url: app.globalData.baseUrl + '/v1/wx/login',
      data: {
        wx_id: wx.getStorageSync("userId"),
        user_type: 1
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.setStorage({
          key: 'userInfo',
          data: res.data.F_data,
        })

        this.setData({
          userInfo: res.data.F_data,
        })

        console.log(this.data.userInfo)
      },
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