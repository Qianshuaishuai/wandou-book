// pages/addsecondhand/addsecondhand.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    typeList: [{
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
    currentTypeindex: 0,
    currentWechat: "",
    currentTitle: "",
    currentAddress: "",
    currentAmount: 0,
    currentReason: "",
    currentPhotos: [],
    qiniuToken: "",
    school: "",
    userInfo: {

    }
  },

  changeType(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentTypeindex: index
    })
  },

  changeAddress(event) {
    var value = event.detail.value
    this.setData({
      currentAddress: value
    })
  },


  changeTitle(event) {
    var value = event.detail.value
    this.setData({
      currentTitle: value
    })
  },

  changeAmount(event) {
    var value = Number(event.detail.value)
    this.setData({
      currentAmount: value
    })
  },

  changeWechat(event) {
    var value = event.detail.value
    this.setData({
      currentWechat: value
    })
  },

  changeReason(event) {
    var value = event.detail.value
    this.setData({
      currentReason: value
    })
  },

  addPhoto() {
    var token = this.data.qiniuToken
    if (token == "") {
      wx.showToast({
        title: '获取上传图片资格失败，请联系管理员',
        icon: 'none'
      })
      return
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        var currentPhotos = this.data.currentPhotos
        if (tempFilePaths.length > 0) {
          // currentPhotos.push(tempFilePaths[0])
          // this.setData({
          //   currentPhotos: currentPhotos
          // })
          this.uploadPhoto(tempFilePaths[0], token)
        }
      }
    })
  },

  uploadPhoto(img, token) {
    var newFileName = "secondhand-photo-" + Date.parse(new Date()) + ".png"
    wx.uploadFile({
      url: 'https://up-z2.qiniup.com', //分华北区，华东区之类的，大家自己注意下
      name: 'file',
      filePath: img,
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        token: token,
        key: newFileName
      },
      success: res => {
        let data = JSON.parse(res.data);
        var url = "https://resource.qimsj.com/" + data.key
        var currentPhotos = this.data.currentPhotos
        currentPhotos.push(url)
        this.setData({
          currentPhotos: currentPhotos
        })
      },

      fail: res => {
        wx.showToast({
          title: '上传图片失败，联系管理员',
          icon: 'none'
        })
      }
    });
  },

  //发布
  release() {
    if (this.data.school.isBind == 0) {
      wx.showToast({
        title: '当前学校没有站长入驻，暂不能发布',
        icon: 'none'
      })
      return
    }

    if (this.data.userInfo.phone == "") {
      wx.showToast({
        title: '请先绑定手机',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/masterregister/masterregister',
        })
      }, 500);
      return
    }

    if (this.data.currentTitle == '') {
      wx.showToast({
        title: '请填写商品名称',
        icon: 'none'
      })
      return
    }


    if (this.data.currentReason == '') {
      wx.showToast({
        title: '请填写理由',
        icon: 'none'
      })
      return
    }

    if (this.data.currentAddress == '') {
      wx.showToast({
        title: '请填写地点',
        icon: 'none'
      })
      return
    }

    if (this.data.currentWechat == '') {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'none'
      })
      return
    }

    if (this.data.currentReason == '') {
      wx.showToast({
        title: '请填写理由',
        icon: 'none'
      })
      return
    }

    if (Number(this.data.currentAmount) <= 0) {
      wx.showToast({
        title: '金额必须大于0',
        icon: 'none'
      })
      return
    }

    if (this.data.currentPhotos.length <= 0) {
      wx.showToast({
        title: '请上传图片',
        icon: 'none'
      })
      return
    }

    this.create()
  },

  getQiniuToken() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/qiniu/token',
      success: res => {
        this.setData({
          qiniuToken: res.data.F_data
        })
      },
    })
  },

  create() {
    wx.showLoading({
      title: '正在发布中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/v1/secondhand/create',
      data: {
        phone: this.data.userInfo.phone,
        title: this.data.currentTitle,
        type: this.data.typeList[this.data.currentTypeindex].id,
        pics: JSON.stringify(this.data.currentPhotos),
        reason: this.data.currentReason,
        address: this.data.currentAddress,
        amount: this.data.currentAmount,
        contract: this.data.currentWechat,
        school_id: this.data.school.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        wx.hideLoading()
        wx.redirectTo({
          url: '/pages/secondhandmanager/secondhandmanager',
        })
      },
      fail: res => {
        console.log(res)
        wx.hideLoading()
      }
    })
  },

  deletePhoto(event) {
    var index = Number(event.currentTarget.dataset.index)
    var photoList = this.data.currentPhotos
    photoList.splice(index, 1)
    this.setData({
      currentPhotos: photoList
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getQiniuToken()
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

    console.log(school)

    this.setData({
      school: school
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
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 500);
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