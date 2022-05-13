// pages/secondhand/secondhand.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    showList: ["", "", "", ""],
    currentSearch: "",
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
    currentTypeIndex: 0,
    secondhandList: [],
    school: "",
    userInfo: {},
    showUnbindDialog2: false,
    showPicDialog: false,
    currentPhone: "",
    currentShowPic: "",
    windowWidth: 0,
    windowHeight: 0,
    showHeight: 0
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

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var index = options.index
    if (index != undefined && index != 0) {
      this.setData({
        currentTypeIndex: index
      })
    }
  },

  buy(event) {

    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '/pages/masterregister/masterregister',
        })
      }, 500);
      return
    }

    var index = Number(event.currentTarget.dataset.index)
    if (this.data.school.isBind == 0) {
      wx.showToast({
        title: '当前学校没有站长入驻，暂不能购买',
        icon: 'none'
      })
      return
    }

    this.setData({
      showUnbindDialog2: true,
      currentPhone: this.data.secondhandList[index].contract
    })
  },

  copy() {
    wx.setClipboardData({
      data: this.data.currentPhone,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制联系方式成功'
            })
          }
        })
      }
    })
  },

  getSecondhandList(type, search) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/secondhand/other/list',
      data: {
        phone: this.data.userInfo.phone,
        type: type,
        search: search,
        school_id: this.data.school.id
      },
      success: res => {
        var secondhandList = res.data.F_data
        var statusList = this.data.statusList
        var typeList = this.data.typeList
        for (var s = 0; s < secondhandList.length; s++) {
          secondhandList[s].picArray = JSON.parse(secondhandList[s].pics)
          // for (var ss = 0; ss < statusList.length; ss++) {
          //   if (statusList[ss].id == secondhandList[s].status) {
          //     secondhandList[s].statusStr = statusList[ss].status
          //   }
          // }

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

  changeIndex(event) {
    var index = Number(event.currentTarget.dataset.index)
    this.setData({
      currentTypeIndex: index,
    })

    this.getSecondhandList(this.data.typeList[index].id, this.data.currentSearch)
  },

  changeInput(event) {
    var value = event.detail.value
    this.setData({
      currentSearch: value
    })
  },

  search() {
    if (this.data.currentSearch == '') {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
      })

      return
    }

    this.getSecondhandList(this.data.typeList[this.data.currentTypeIndex].id, this.data.currentSearch)
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
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 500);
    }

    var school = wx.getStorageSync('school')
    if (school == undefined || school.id == undefined || school.id == 0) {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
      return
    }

    this.setData({
      school: school
    })

    var index = this.data.currentTypeIndex
    if (index != undefined && index != 0) {
      this.setData({
        currentTypeIndex: index
      })
      this.getSecondhandList(this.data.typeList[this.data.currentTypeIndex].id, this.data.currentSearch)
    } else {
      this.getSecondhandList(0, this.data.currentSearch)
    }
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