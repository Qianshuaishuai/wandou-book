// pages/certrider/certrider.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentStudentNo:"",
    currentName:"",
    userInfo:{},
    school:{},
    currentPic:""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.getQiniuToken()
    var school = wx.getStorageSync('school')
    var userInfo = wx.getStorageSync('userInfo')
    if (school == undefined || school.id == undefined || school.id == 0) {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
      return
    }

    this.setData({
      userInfo: userInfo,
      school: school
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
    var newFileName = "applymaster-photo-" + Date.parse(new Date()) + ".png"
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
        this.setData({
          currentPic: url
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

  changeName(event) {
    var value = event.detail.value
    this.setData({
      currentName: value
    })
  },

  changeStudentNo(event) {
    var value = event.detail.value
    this.setData({
      currentStudentNo: value
    })
  },

  commit(event){
    var currentStudentNo = this.data.currentStudentNo
    var currentName = this.data.school.currentName
    var currentSchoolID = this.data.school.id
    var currentPic = this.data.currentPic

    if (this.data.currentStudentNo == "") {
      wx.showToast({
        title: '请填写学生证号',
        icon: 'none'
      })
      return
    }

    if (this.data.currentName == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }

    if (this.data.currentWechat == '') {
      wx.showToast({
        title: '请上传学生证正面',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '申请中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/v1/rider/apply',
      data: {
        phone: this.data.userInfo.phone,
        studentNo: currentStudentNo,
        school_id: currentSchoolID,
        studentPic: currentPic,
        name: currentName
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.F_responseNo == 10000) {
          wx.showModal({
            title: '提示',
            content: '我们会尽快审核申请,然后通知到你',
            showCancel: false,
            success: res => {
              wx.switchTab({
                url: '/pages/newme/newme',
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.F_responseMsg,
            icon: 'none',
            duration: 2000
          })
        }
        wx.hideLoading()
      },
      fail: res => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '申请失败，请联系管理员',
          icon: 'none',
          duration: 2000
        })
      }
    })
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

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

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