// pages/addaddress/addaddress.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    currentErrandPhone: "",
    currentErrandAddress: "",
    currentErrandName: "",
    currentSellPhone: "",
    currentSellAddress: "",
    currentSellName: "",
    id: 0,
    currentSellOperate: "创建",
    currentErrandOperate: "创建",
    sellAddress: ['北京市', '北京市', '东城区'],
    sellProvince: "",
    sellCity: "",
    sellDistrict: "",
    userInfo: {}
  },

  bindPickerChange(e) {
    var province = e.detail.value[0]
    var city = e.detail.value[1]
    var district = e.detail.value[2]
    this.setData({
      sellAddress: e.detail.value,
      sellProvince: province,
      sellCity: city,
      sellDistrict: district
    })
  },

  changeErrandAddress(event) {
    var value = event.detail.value
    this.setData({
      currentErrandAddress: value
    })
  },

  changeErrandName(event) {
    var value = event.detail.value
    this.setData({
      currentErrandName: value
    })
  },

  changeErrandPhone(event) {
    var value = event.detail.value
    this.setData({
      currentErrandPhone: value
    })
  },

  changeSellAddress(event) {
    var value = event.detail.value
    this.setData({
      currentSellAddress: value
    })
  },

  changeSellName(event) {
    var value = event.detail.value
    this.setData({
      currentSellName: value
    })
  },

  changeSellPhone(event) {
    var value = event.detail.value
    this.setData({
      currentSellPhone: value
    })
  },

  addSellAddress() {
    var sellPhone = this.data.currentSellPhone
    var sellAddress = this.data.currentSellAddress
    var sellName = this.data.currentSellName
    var sellProvince = this.data.sellProvince
    var sellCity = this.data.sellCity
    var sellDistrict = this.data.sellDistrict

    if (sellProvince == "") {
      wx.showToast({
        title: '请先选择地区信息',
        icon: 'none',
      })
      return
    }

    if (sellPhone == "") {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'none'
      })

      return
    }

    if (sellAddress == "") {
      wx.showToast({
        title: '请填写地址',
        icon: 'none'
      })

      return
    }

    if (sellName == "") {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })

      return
    }

    wx.showLoading({
      title: '正在' + this.data.currentSellOperate + '中...',
    })
    var sendData = new Object
    var operaUrl = '/v1/newaddress/create'
    if (this.data.currentSellOperate == '编辑') {
      sendData = {
        id: this.data.id,
        phone: this.data.userInfo.phone,
        type: 2,
        address: sellAddress,
        contract: sellPhone,
        name: sellName,
        province: sellProvince,
        city: sellCity,
        district: sellDistrict
      }
      operaUrl = '/v1/newaddress/update'
    } else {
      sendData = {
        phone: this.data.userInfo.phone,
        type: 2,
        address: sellAddress,
        contract: sellPhone,
        name: sellName,
        province: sellProvince,
        city: sellCity,
        district: sellDistrict
      }
      operaUrl = '/v1/newaddress/create'
    }
    wx.request({
      url: app.globalData.baseUrl + operaUrl,
      data: sendData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          wx.showToast({
            title: this.data.currentSellOperate + '成功',
            icon: 'none'
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        } else {
          wx.showToast({
            title: this.data.currentSellOperate + '失败,联系管理员',
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: this.data.currentSellOperate + '失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },

  addErrandAddress() {
    var errandPhone = this.data.currentErrandPhone
    var errandAddress = this.data.currentErrandAddress
    var errrandName = this.data.currentErrandName

    if (errandPhone == "") {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'none'
      })

      return
    }

    if (errandAddress == "") {
      wx.showToast({
        title: '请填写地址',
        icon: 'none'
      })

      return
    }

    if (errrandName == "") {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })

      return
    }

    wx.showLoading({
      title: '正在' + this.data.currentErrandOperate + '中...',
    })
    var sendData = new Object
    var operaUrl = '/v1/newaddress/create'
    if (this.data.currentErrandOperate == '编辑') {
      sendData = {
        id: this.data.id,
        phone: this.data.userInfo.phone,
        type: 1,
        address: errandAddress,
        contract: errandPhone,
        name: errrandName
      }
      operaUrl = '/v1/newaddress/update'
    } else {
      sendData = {
        phone: this.data.userInfo.phone,
        type: 1,
        address: errandAddress,
        contract: errandPhone,
        name: errrandName
      }
      operaUrl = '/v1/newaddress/create'
    }
    wx.request({
      url: app.globalData.baseUrl + operaUrl,
      data: sendData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.F_responseNo == 10000) {
          wx.showToast({
            title: this.data.currentErrandOperate + '成功',
            icon: 'none'
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        } else {
          wx.showToast({
            title: this.data.currentErrandOperate + '失败,联系管理员',
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: this.data.currentErrandOperate + '失败,联系管理员',
          icon: 'none'
        })
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var id = options.id
    this.setData({
      id: id
    })
    if (id != 0) {
      this.getNewAddressDetail(id)
      wx.setNavigationBarTitle({
        title: '编辑地址'
      })
    }
  },

  getNewAddressDetail(id) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/newaddress/detail',
      data: {
        id: id,
      },
      success: res => {
        var data = res.data.F_data
        if (data.type == 1) {
          this.setData({
            currentErrandPhone: data.contract,
            currentErrandAddress: data.address,
            currentErrandName: data.name,
            currentErrandOperate: "编辑"
          })
        } else {
          var newAddress = new Array
          newAddress.push(data.province)
          newAddress.push(data.city)
          newAddress.push(data.district)
          this.setData({
            currentSellPhone: data.contract,
            currentSellAddress: data.address,
            currentSellName: data.name,
            currentSellOperate: "编辑",
            sellProvince: data.province,
            sellCity: data.city,
            sellDistrict: data.district,
            sellAddress: newAddress
          })
        }
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