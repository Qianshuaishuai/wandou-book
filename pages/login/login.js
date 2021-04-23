// pages/login/login.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**

  * 生命周期函数--监听页面加载

  */

  onLoad: function (options) {

    var that = this;

    //查看是否授权

    wx.getSetting({

      success: function (res) {

        if (res.authSetting['scope.userInfo']) {

          console.log("用户授权了");

          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }

              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          })

        } else {

          //用户没有授权

          console.log("用户没有授权");

        }

      }

    });

  },

  bindGetUserInfo: function (res) {

    if (res.detail.userInfo) {

      //用户按了允许授权按钮

      var that = this;

      // 获取到用户的信息了，打印到控制台上看下

      console.log("用户的信息如下：");

      console.log(res.detail.userInfo);

      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来

      that.setData({

        isHide: false

      });

      wx.getUserInfo({
        success: res => {
          console.log(res)
          // 可以将 res 发送给后台解码出 unionId
          app.globalData.userInfo = res.userInfo

          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback(res)
          }

          wx.reLaunch({
            url: '/pages/newindex/newindex',
          })
        }
      })

    } else {

      //用户按了拒绝按钮

      wx.showModal({

        title: '警告',

        content: '如果您拒绝授权，将无法正常使用事件流应用！',

        showCancel: false,

        confirmText: '返回授权',

        success: function (res) {

          // 用户没有授权成功，不需要改变 isHide 的值

          if (res.confirm) {

            console.log('用户点击了“返回授权”');

          }

        }

      });

    }

   }
})