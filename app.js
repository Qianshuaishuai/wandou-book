//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code
        if (code) {
          // wx.showLoading({
          //   title: '数据加载中...',
          // })
          wx.request({
            url: this.globalData.baseUrl+ '/v1/wx/getid',
            data: {
              code: code,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: res => {
              this.getUserInfo(res.data.F_data.openid)
              wx.setStorage({
                key: 'userId',
                data: res.data.F_data.openid,
              })
              wx.setStorage({
                key: 'sessionKey',
                data: res.data.F_data.session_key,
              })
            },
          })
        } else {
          console.log('获取用户登录失败：' + res.errMsg);
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },

  getWxUserInfo(){
    var that = this
    let promise = new Promise(function (resolve, reject) {
      let self = this;
      wx.getSetting({
        success: res => {
          console.log(res)
          console.log(res.authSetting)
          console.log(res.authSetting['scope.userInfo'])
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            console.log("get")
            wx.getUserInfo({
              success: res => {
                console.log(res)
                // 可以将 res 发送给后台解码出 unionId
                that.globalData.userInfo = res.userInfo
                resolve();
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (that.userInfoReadyCallback) {
                  that.userInfoReadyCallback(res)
                }
              },fail:res =>{
                console.log(res)
              }
            })
          } else {
            wx.navigateTo({
              url: '/pages/login/login',
            })
            reject();
          }
        }
      })
    })
    return promise
  },

  getUserInfo(wxid){
    wx.request({
      url: this.globalData.baseUrl + '/v1/wx/login',
      data: {
        wx_id: wxid,
        user_type: 1
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        wx.setStorage({
          key: 'userInfo',
          data: res.data.F_data,
        })
      },
    })
  },

  globalData: {
    userInfo: null,
    baseUrl: 'https://api.dyydyy.cn',
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight']
  }
})