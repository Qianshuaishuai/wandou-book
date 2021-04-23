//index.js
//获取应用实例
const app = getApp()

Page({

  hotBook: function() {
    wx.navigateTo({
      url: '/pages/hotBookRank/hotBookRank',
    })
  },

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    // 用户触发了下拉刷新操作

    // 拉取新数据重新渲染界面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() // 可以停止当前页面的下拉刷新

  },

  joinPartner: function() {
    wx.navigateTo({
      url: "/pages/partner/partner"
    })
  },
  data: {
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

  scanCode: function() {
    var that = this;
    wx.scanCode({
      success: res => {
        //对扫码获得信息的识别操作
        var isbn = res.result
        this.searchBookIsbn(isbn)
      },
      fail: function(res) {
        wx.showToast({
          title: '没有此图书',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function(res) {},
    })
  },

  searchBook: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  onLoad: function(options) {
    if (options.scene) {
      var rwxid = wx.getStorageSync("userId")

      if (rwxid && rwxid != "" && rwxid != options.scene ) {
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
    var currentHeight = currentWidth*maxHeight/maxWidth

    this.setData({
      showWidth: currentWidth,
      showHeight: currentHeight
    })
  },

  getHotBook() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/book/hot',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        this.setData({
          hotBookList: res.data.F_data
        })
      },
    })
  },

  searchBookIsbn(isbn) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/book/searchisbn',
      data: {
        isbn: isbn,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.data.F_responseNo == 10000) {
          wx.setStorage({
            key: 'book',
            data: res.data.F_data,
          })
          wx.navigateTo({
            url: '/pages/sellList/sellList?mode=' + 999
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '此书籍暂不回收！',
            showCancel: false
          })
        }
      },
    })
  },

})