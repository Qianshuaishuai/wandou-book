// pages/secondhandmanager/secondhandmanager.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    testList: ["", "", "", "", "", ""],
    currentTypeIndex: 0,
    showSelectDialog: false,
    statusList: [{
      "id": 1,
      "status": "发布中"
    }, {
      "id": 0,
      "status": "下架中"
    }, {
      "id": -1,
      "status": "已删除"
    }],
    typeList: [{
      "id": 0,
      "name": "全部"
    }, {
      "id": 1,
      "name": "书籍"
    }, {
      "id": 2,
      "name": "日用品"
    }, {
      "id": 3,
      "name": "电子产品"
    }, {
      "id": 4,
      "name": "自行车"
    }, {
      "id": 5,
      "name": "服饰鞋包"
    }, {
      "id": 6,
      "name": "电动车"
    }, {
      "id": 7,
      "name": "其他"
    }],
    secondhandList: [],
    userInfo:{},
    showUnbindDialog2: false,
    showPicDialog: false,
    currentPhone: "",
    currentShowPic: "",
    windowWidth: 0,
    windowHeight: 0,
    showHeight: 0 
  },

  doSelectDialog() {
    this.setData({
      showSelectDialog: true
    })
  },

  closeDialog(event) {
    this.setData({
      showUnbindDialog2: false,
      showPicDialog: false
    })
  },

  showPic(event) {
    var url = event.currentTarget.dataset.url
    this.setData({
      showPicDialog: true,
      currentShowPic: url
    })

    wx.getImageInfo({
      src: url,
      success: res => {
        var width = res.width
        var height = res.height
        var windowWidth = wx.getSystemInfoSync().windowWidth
        var windowHeight = wx.getSystemInfoSync().windowHeight
        var range = height / width
        var showHeight = range * (windowWidth - 60)

        this.setData({
          windowWidth: windowWidth,
          showHeight: showHeight,
          windowHeight: windowHeight,
        })
      }
    })
  },

  selectType(event) {
    var index = Number(event.currentTarget.dataset.index)
    this.getSecondhandList(this.data.typeList[index].id)
    this.setData({
      showSelectDialog: false,
      currentTypeIndex: index
    })
  },

  deleteP(event) {
    var index = Number(event.currentTarget.dataset.index)
    var id = this.data.secondhandList[index].id

    var status = this.data.secondhandList[index].status
    if (status == -1) {
      wx.showToast({
        title: '已是删除状态',
        icon: 'none'
      })
      return
    }

    wx.request({
      url: app.globalData.baseUrl + '/v1/secondhand/delete',
      data: {
        id: id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        })
        this.getSecondhandList(this.data.typeList[this.data.currentTypeIndex].id)
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    })
  },

  up(event) {
    var index = Number(event.currentTarget.dataset.index)
    var id = this.data.secondhandList[index].id

    var status = this.data.secondhandList[index].status
    if (status == -1) {
      wx.showToast({
        title: '闲置已被删除',
        icon: 'none'
      })
      return
    }
    var status = this.data.secondhandList[index].status
    if (status == 1) {
      wx.showToast({
        title: '已是上架状态',
        icon: 'none'
      })
      return
    }

    if (status == -1) {
      wx.showToast({
        title: '闲置已被删除',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: app.globalData.baseUrl + '/v1/secondhand/up',
      data: {
        id: id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '上架成功',
          icon: 'none'
        })
        this.getSecondhandList(this.data.typeList[this.data.currentTypeIndex].id)
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '上架失败',
          icon: 'none'
        })
      }
    })
  },

  down(event) {
    var index = Number(event.currentTarget.dataset.index)
    var id = this.data.secondhandList[index].id
    var status = this.data.secondhandList[index].status
    if (status == 0) {
      wx.showToast({
        title: '已是下架状态',
        icon: 'none'
      })
      return
    }

    if (status == -1) {
      wx.showToast({
        title: '闲置已被删除',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: app.globalData.baseUrl + '/v1/secondhand/down',
      data: {
        id: id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '下架成功',
          icon: 'none'
        })
        this.getSecondhandList(this.data.typeList[this.data.currentTypeIndex].id)
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '下架失败',
          icon: 'none'
        })
      }
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
   
  },

  getSecondhandList(type) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/secondhand/self/list',
      data: {
        phone: this.data.userInfo.phone,
        type: type
      },
      success: res => {
        var secondhandList = res.data.F_data
        var statusList = this.data.statusList
        var typeList = this.data.typeList
        for (var s = 0; s < secondhandList.length; s++) {
          secondhandList[s].picArray = JSON.parse(secondhandList[s].pics)
          for (var ss = 0; ss < statusList.length; ss++) {
            if (statusList[ss].id == secondhandList[s].status) {
              secondhandList[s].statusStr = statusList[ss].status
            }
          }

          for (var t = 0; t < typeList.length; t++) {
            if (typeList[t].id == secondhandList[s].type) {
              secondhandList[s].typeStr = typeList[t].name
            }
          }
        }
        this.setData({
          secondhandList: secondhandList
        })
      },
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
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })

    if (userInfo.phone == '') {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 500);
    }

    this.getSecondhandList(0)
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