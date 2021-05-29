// pages/address/address.js
Page({

  /**
   * Page initial data
   */
  data: {
    name: "",
    phone: "",
    detail: "",
    address: ['北京市', '北京市', '东城区'],
    province: "",
    city: "",
    district: "",
    type: 1,
  },

  bindPickerChange(e) {
    var province = e.detail.value[0]
    var city = e.detail.value[1]
    var district = e.detail.value[2]
    this.setData({
      address: e.detail.value,
      province: province,
      city: city,
      district: district
    })
  },

  changeName(e) {
    this.setData({
      name: e.detail.value
    })
  },

  pickerAddress(e) {

  },

  getAddressObject() {
    var object = new Object
    object.name = ""
    object.phone = ""
    object.province = ""
    object.city = ""
    object.district = ""
    object.detail = ""
    return object
  },

  save(e) {
    var addressObj = this.getAddressObject()
    var name = this.data.name
    var phone = this.data.phone
    var city = this.data.city
    var province = this.data.province
    var district = this.data.district
    var detail = this.data.detail

    if (name == "") {
      wx.showToast({
        title: '请先填写发件人',
        icon: 'none',
      })
      return
    }

    if (phone == "") {
      wx.showToast({
        title: '请先填写手机号',
        icon: 'none',
      })
      return
    }

    if (province == "") {
      wx.showToast({
        title: '请先选择地址信息',
        icon: 'none',
      })
      return
    }

    if (detail == "") {
      wx.showToast({
        title: '请填写具体地址',
        icon: 'none',
      })
      return
    }

    if (this.data.type == 2) {
      console.log(province)
      console.log(province.indexOf("上海") )
      if (province.indexOf("浙江") == -1 && province.indexOf("江苏") == -1 && province.indexOf("安徽") == -1 && province.indexOf("上海") == -1) {
        wx.showToast({
          title: '目前仅回收浙江、江苏、安徽、上海四个地区，其余地 区暂不开放',
          icon: 'none',
        })
        return
      }
    }

    addressObj.province = province
    addressObj.city = city
    addressObj.district = district
    addressObj.detail = detail
    addressObj.name = name
    addressObj.phone = phone

    wx.setStorageSync("address", addressObj)
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
    wx.navigateBack({
      delta: 1
    })
  },

  changePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  changeDetail(e) {
    this.setData({
      detail: e.detail.value
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var type = options.type
    console.log(type)
    var address = wx.getStorageSync('address')

    if (address.name != undefined) {
      this.setData({
        name: address.name,
        phone: address.phone,
        province: address.province,
        city: address.city,
        district: address.district,
        detail: address.detail,
      })
    }
    this.setData({
      type: type,
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