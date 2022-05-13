// pages/receivecardetail/receivecardetail.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    testList: ["", "", "", "", "", ""],
    currentPhone: "",
    currentWechat: "",
    carBookList: [],
    allPrice: 0.0,
    currentBookCount: 0,
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    address: {id: 0},
    currentAddressId: 1,
    userInfo: {},
    school: {}
  },

  goToAddress() {
    wx.navigateTo({
      url: '/pages/myaddress/myaddress?status=1',
    })
  },

  changePhone(event) {
    var value = event.detail.value
    this.setData({
      currentPhone: value
    })
  },

  changeWechat(event) {
    var value = event.detail.value
    this.setData({
      currentWechat: value
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var currentCarList = wx.getStorageSync('carList')
    var school = wx.getStorageSync('school')
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
      school: school,
      carBookList: currentCarList
    })

    this.translateAllPrice()

    var object = new Object
    object.id = 0
    wx.setStorage({
      key: 'addressSelect',
      data: object,
    })
  },

  translateAllPrice() {
    var list = this.data.carBookList
    var allPrice = 0.0
    for (let l = 0; l < list.length; l++) {
      allPrice = allPrice + (list[l].price * list[l].num)
    }
    allPrice = allPrice.toFixed(2)
    this.setData({
      allPrice: allPrice
    })

    var currentBookCount = 0
    for (var b = 0; b < list.length; b++) {
      currentBookCount = currentBookCount + list[b].num
    }

    this.setData({
      currentBookCount: currentBookCount
    })

    // this.updateCommitStatus

  },


  reduce(event) {
    var index = Number(event.currentTarget.dataset.index)
    var currentCarList = this.data.carBookList
    if (currentCarList[index].num <= 1) {
      return
    }

    currentCarList[index].num = currentCarList[index].num - 1

    this.setData({
      carBookList: currentCarList
    })

    this.translateAllPrice()
  },

  add(event) {
    var index = Number(event.currentTarget.dataset.index)
    var currentCarList = this.data.carBookList

    // if (currentCarList[index].num <= 1) {
    //   currentCarList[index].num = currentCarList[index].num - 1
    // }

    currentCarList[index].num = currentCarList[index].num + 1

    this.setData({
      carBookList: currentCarList
    })

    this.translateAllPrice()
  },

  bindTimeChangeForStart(event) {
    this.setData({
      startTime: event.detail.value
    })
  },

  bindTimeChangeForEnd(event) {
    this.setData({
      endTime: event.detail.value
    })
  },

  bindDateChangeForStart(event) {
    this.setData({
      startDate: event.detail.value
    })
  },

  bindDateChangeForEnd(event) {
    this.setData({
      endDate: event.detail.value
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
    var address = wx.getStorageSync('addressSelect')
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
      }, 2000);
    }

    if (address.id == 0){
      if(this.data.address.id == 0){
        this.getAddressDefault()
      }
    }else{
      this.setData({
        address: address
      })
    }
  },

  getAddressDefault() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/newaddress/default',
      data: {
        phone: this.data.userInfo.phone,
        type: 2,
      },
      success: res => {
        this.setData({
          address: res.data.F_data
        })
      },
    })
  },

  commit() {
    var currentBookCount = this.data.currentBookCount
    var allPrice = this.data.allPrice

    if (currentBookCount < 18 && allPrice < 28) {
      wx.showModal({
        title: '友情提示',
        content: '回收书籍最低提交18本或满28元即可回收',
        showCancel: false
      })
      return
    }

    if (currentBookCount > 200) {
      wx.showModal({
        title: '友情提示',
        content: '回收书籍一单最多200本',
        showCancel: false
      })
      return
    }

    var bookList = this.data.carBookList
    var currentBookCount = 0
    var allPrice = this.data.allPrice
    var bookData = []
    var phoneStr = this.data.address.contract
    var nameStr = this.data.address.name
    var addressStr = this.data.address.address
    var currentPhone = this.data.currentPhone
    var currentWechat = this.data.currentWechat

    var startDate = this.data.startDate
    var startTime = this.data.startTime
    var endDate = this.data.endDate
    var endTime = this.data.endTime

    var province = this.data.address.province

    if (province == "") {
      wx.showToast({
        title: '请先选择你的区域信息',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (province.indexOf("新疆") != -1 || province.indexOf("西藏") != -1) {
      wx.showToast({
        title: '目前新疆西藏地区暂不开放',
        icon: 'none',
      })
      return
    }

    if (startDate == "") {
      wx.showToast({
        title: '请先选择发件起始日期',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (startTime == "") {
      wx.showToast({
        title: '请先选择发件起始时间',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (endDate == "") {
      wx.showToast({
        title: '请先选择发件结束日期',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (endTime == "") {
      wx.showToast({
        title: '请先选择发件结束时间',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (addressStr == "") {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (phoneStr == "") {
      wx.showToast({
        title: '联系方式不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (nameStr == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }


    if (currentPhone == "") {
      wx.showToast({
        title: '联系电话不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (currentWechat == "") {
      wx.showToast({
        title: '微信不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    var startTimeStr = this.data.startDate + " " + this.data.startTime + ":00"
    var endTimeStr = this.data.endDate + " " + this.data.endTime + ":00"

    var startTimeStr = startTimeStr.replace(/\-/g, "/");
    var startDate = new Date(startTimeStr);

    var endTimeStr = endTimeStr.replace(/\-/g, "/");
    var endDate = new Date(endTimeStr);

    var currentDate = new Date();
    if (parseInt(currentDate - startDate) > 0 || parseInt(currentDate - endDate) > 0) {
      wx.showToast({
        title: '收货起始时间或结束时间不能早于当前时间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (parseInt(endDate - startDate) <= 0) {
      wx.showToast({
        title: '收货结束时间不能早于起始时间',
        icon: 'none',
        duration: 2000
      })
      return
    }

    var bookData = []
    for (var b = 0; b < bookList.length; b++) {
      currentBookCount = currentBookCount + bookList[b].num

      var book = new Object;
      book.id = bookList[b].id
      book.count = bookList[b].num
      bookData.push(book)
    }

    var wxid = wx.getStorageSync("userId")
    this.submitBookList(wxid, JSON.stringify(bookData))
  },

  submitBookList(wxid, bookData) {
    wx.showLoading({
      title: '订单提交中',
    })

    wx.request({
      url: app.globalData.baseUrl + '/v1/order/build',
      data: {
        phone: this.data.userInfo.phone,
        schoolId: this.data.school.id,
        addressId: this.data.currentAddressId,
        bookDatas: bookData,
        price: this.data.allPrice,
        name: this.data.address.name,
        contractPhone: this.data.address.contract,
        detail: this.data.address.address,
        wlStartTime: this.data.startDate + " " + this.data.startTime + ":00",
        wlEndTime: this.data.endDate + " " + this.data.endTime + ":00",
        province: this.data.address.province,
        city: this.data.address.city,
        district: this.data.address.district,
        otherPhone: this.data.currentPhone,
        otherWeChat: this.data.currentWechat,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
         // content: '你已成功提交,毕业季末高峰期为加快审核速度，请将书籍打包后写上姓名电话订单编号（DY+数字）交给京东快递员',
      success: res => {
        if (res.data.F_responseNo == 10000) {
          wx.showModal({
            title: '提示',
            content: '你已成功提交订单，请将书籍打包好交付于京东快递员，并在打包书籍中写一张小纸条您的订编号(LPXXX)以及手机号码姓名',
            showCancel: false,
            success: res => {
              this.setData({
                carBookList: []
              })

              wx.setStorage({
                key: 'carList',
                data: this.data.carBookList,
              })

              wx.navigateBack({
                delta: 1
              })
            }
          })

        } else {
          wx.showToast({
            title: '提交失败，请联系管理员',
            icon: 'none',
            duration: 2000
          })
        }
        wx.hideLoading()
      },
    })
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