// pages/applymaster/applymaster.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    gradeList: ["大一", "大二", "大三", "大四"],
    currentGradeindex: 0,
    currentCount: 0,
    currentSchoolName: "",
    currentPhone: "",
    currentWechat: "",
    school: {},
    qiniuToken: "",
    currentPic: "",
    userInfo: "",
  },

  changeGrade(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentGradeindex: index
    })
  },

  changeCount(event) {
    var value = Number(event.detail.value)
    this.setData({
      currentCount: value
    })
  },

  changeSchoolName(event) {
    var value = event.detail.value
    this.setData({
      currentSchoolName: value
    })
  },

  changeWechat(event) {
    var value = event.detail.value
    this.setData({
      currentWechat: value
    })
  },


  changePhone(event) {
    var value = event.detail.value
    this.setData({
      currentPhone: value
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

  apply() {
    var currentCount = this.data.currentCount
    var currentSchoolName = this.data.school.name
    var currentSchoolID = this.data.school.id
    var currentPhone = this.data.currentPhone
    var currentWechat = this.data.currentWechat
    var currentPic = this.data.currentPic

    if (this.data.currentCount <= 0) {
      wx.showToast({
        title: '请填写团队人数',
        icon: 'none'
      })
      return
    }

    if (this.data.currentPhone == '') {
      wx.showToast({
        title: '请填写电话',
        icon: 'none'
      })
      return
    }

    if (this.data.currentWechat == '') {
      wx.showToast({
        title: '请填写微信',
        icon: 'none'
      })
      return
    }

    if (this.data.currentPic == '') {
      wx.showToast({
        title: '请先上传图片',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '申请中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/v1/master/apply',
      data: {
        phone: this.data.userInfo.phone,
        teamNumber: currentCount,
        school_name: currentSchoolName,
        school_id: currentSchoolID,
        grade: this.data.currentGradeindex+1,
        studentPic: currentPic,
        wechat: currentWechat,
        contractPhone: currentPhone,
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
      setTimeout(function() {
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