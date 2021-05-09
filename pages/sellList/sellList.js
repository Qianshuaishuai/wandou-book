const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    showModal: false,
    carBookList: [],
    addresses: [],
    citys: [{
      id: 1,
      name: "浙江"
    }, {
      id: 2,
      name: "安徽"
    }, {
      id: 3,
      name: "江苏"
    }],
    currentAddress: 0,
    currentAddressId: 1,
    currentBookCount: 0,
    phoneStr: "",
    nameStr: "",
    addressStr: "",
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    region:[],
    province:"",
    city:"",
    district:"",
    addressObj: {},
    allPrice: 0.0, //总价，单位：分
    // bookInfo: [{ 
    //   name: "算计",
    //   price: "2.00",
    //   src: "/assets/images/book1.jpg",
    //   num: 1
    // },
    // {
    //   name: "中国史学史稿",
    //   price: "4.50",
    //   src: "/assets/images/book2.jpg",
    //   num: 1
    // },
    // {
    //   name: "不存在的女孩",
    //   price: "3.00",
    //   src: "/assets/images/book3.jpg",
    //   num: 1
    // },
    // {
    //   name: "护士的故事",
    //   price: "6.20",
    //   src: "/assets/images/book4.jpg",
    //   num: 1
    // },
    // {
    //   name: "人间游戏",
    //   price: "3.35",
    //   src: "/assets/images/book5.jpg",
    //   num: 1
    // },
    // {
    //   name: "政府监管的新视野",
    //   price: "4.00",
    //   src: "/assets/images/book6.jpg",
    //   num: 1
    // },
    // {
    //   name: "厄普代克短篇小说集",
    //   price: "2.56",
    //   src: "/assets/images/book7.jpg",
    //   num: 1
    // }]
  },

  goToAddress(e) {
    wx.navigateTo({
      url: "/pages/address/address?type=2"
    })
  },

  back(e) {
    wx.navigateBack({
      delta: 1
    })
  },

  bindRegionChange(event){
      var values = event.detail.value

      this.setData({
        province: values[0],
        city: values[1],
        district: values[2]
      })
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

  changePhone(e) {
    this.setData({
      phoneStr: e.detail.value
    })
  },

  goToRule() {
    wx.navigateTo({
      url: '/pages/rule/rule',
    })
  },

  changeName(e) {
    this.setData({
      nameStr: e.detail.value
    })
  },

  changeAddress(e) {
    this.setData({
      addressStr: e.detail.value
    })
  },

  deleteItem(e) {
    var index = e.currentTarget.dataset.index;
    var items = this.data.carBookList
    items.splice(index, 1);
    this.setData({
      carBookList: items
    })
    wx.setStorage({
      key: 'carList',
      data: this.data.carBookList,
    })
    this.translateAllPrice()
  },

  commit() {
    var bookList = this.data.carBookList
    var currentBookCount = 0
    var allPrice = this.data.allPrice
    var bookData = []
    var phoneStr = this.data.addressObj.phone
    var nameStr = this.data.addressObj.name
    var addressStr = this.data.addressObj.detail

    var startDate = this.data.startDate
    var startTime = this.data.startTime
    var endDate = this.data.endDate
    var endTime = this.data.endTime

    var province  = this.data.addressObj.province

    if (province == "") {
      wx.showToast({
        title: '请先选择你的区域信息',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (province.indexOf("浙江") == -1 && province.indexOf("江苏") == -1 && province.indexOf("安徽") == -1 && province.indexOf("上海") == -1) {
      wx.showToast({
        title: '目前仅回收浙江、江苏、安徽、上海四个地区，其余地 区暂不开放',
        icon: 'none',
      })
      return
    }

    if (startDate == "") {
      wx.showToast({
        title: '请先选择收货起始日期',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (startTime == "") {
      wx.showToast({
        title: '请先选择收货起始时间',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (endDate == "") {
      wx.showToast({
        title: '请先选择收货结束日期',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (endTime == "") {
      wx.showToast({
        title: '请先选择收货结束时间',
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

    var startTimeStr = this.data.startDate + " " + this.data.startTime + ":00"
    var endTimeStr = this.data.endDate + " " + this.data.endTime + ":00"

    var startTimeStr = startTimeStr.replace(/\-/g, "/");
    var startDate = new Date(startTimeStr);

    var endTimeStr = endTimeStr.replace(/\-/g, "/");
    var endDate = new Date(endTimeStr);

    var currentDate = new Date();
    if (parseInt(currentDate - startDate) > 0 || parseInt(currentDate - endDate)>0){
      wx.showToast({
        title: '收货起始时间或结束时间不能早于当前时间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (parseInt(endDate - startDate)<=0){
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

  radioChange(e) {
    this.setData({
      currentAddressId: e.detail.value
    })
  },

  introModal: function() {
    this.setData({
      showModal: true
    })
  },
  closeModal: function() {
    this.setData({
      showModal: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var currentCarList = wx.getStorageSync('carList')
    if (currentCarList.length > 0) {
      this.setData({
        carBookList: currentCarList
      })
    }
    let bookId = options.bookId //接收图书信息
    let ISBNCode = options.ISBNCode //接收ISBN信息
    let mode = options.mode

    if (mode == 999) {
      var isbnBook = wx.getStorageSync('book')

      var currentIndex = this.jdugeIsInCarList(isbnBook)
      if (currentIndex !== -1) {
        // var oldList = this.data.carBookList
        // oldList[currentIndex].num = oldList[currentIndex].num + 1
        // this.setData({
        //   carBookList: oldList
        // })
        wx.showToast({
          title: '一个订单只能提交一本相同的书籍',
          icon: 'none',
          duration: 2000
        })
      } else {
        var oldList = this.data.carBookList
        isbnBook.num = 1
        console.log(oldList)
        oldList.push(isbnBook)
        this.setData({
          carBookList: oldList
        })
      }
    }

    wx.setStorage({
      key: 'carList',
      data: this.data.carBookList,
    })

    this.translateAllPrice()
    this.getAddress()
  },

  translateAllPrice() {
    var list = this.data.carBookList
    var allPrice = 0.0
    for (let l = 0; l < list.length; l++) {
      allPrice = allPrice + (list[l].price * list[l].num)
    }

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
  },

  jdugeIsInCarList(data) {
    var currentList = this.data.carBookList
    for (var c = 0; c < this.data.carBookList.length; c++) {
      if (currentList[c].isbn === data.isbn) {
        return c
      }
    }

    return -1
  },

  submit() {
    var bookList = this.data.carBookList
    var currentBookCount = 0
    var allPrice = this.data.allPrice
    var bookData = []

    for (var b = 0; b < bookList.length; b++) {
      currentBookCount = currentBookCount + bookList[b].num

      var book = new Object;
      book.id = bookList[b].id
      book.count = bookList[b].num
      bookData.push(book)
    }

    if (currentBookCount < 8) {
      wx.showModal({
        title: '友情提示',
        content: '回收书籍最低提交8本',
        showCancel: false
      })
      return
    }

    if (currentBookCount > 160) {
      wx.showModal({
        title: '友情提示',
        content: '一次订单最多只能提交160本旧书籍',
        showCancel: false
      })
      return
    }


    this.setData({
      showModal: true
    })
  },

  submitBookList(wxid, bookData) {
    wx.showLoading({
      title: '订单提交中',
    })

    wx.request({
      url: app.globalData.baseUrl + '/v1/order/build',
      data: {
        wxId: wxid,
        addressId: this.data.currentAddressId,
        bookDatas: bookData,
        price: this.data.allPrice,
        name: this.data.addressObj.name,
        phone: this.data.addressObj.phone,
        detail: this.data.addressObj.detail,
        wlStartTime: this.data.startDate + " "+ this.data.startTime + ":00",
        wlEndTime: this.data.endDate + " " + this.data.endTime + ":00",
        province: this.data.addressObj.province,
        city: this.data.addressObj.city,
        district: this.data.addressObj.district
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.F_responseNo == 10000) {
          wx.showModal({
            title: '提示',
            content: '你已成功提交,毕业季末高峰期为加快审核速度，请将书籍打包后写上姓名电话订单编号（DY+数字）交给京东快递员',
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

  getAddress() {
    wx.request({
      url: app.globalData.baseUrl + '/v1/user/address',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        this.setData({
          addresses: res.data.F_data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var address = wx.getStorageSync('address')
    this.setData({
      addressObj: address
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})