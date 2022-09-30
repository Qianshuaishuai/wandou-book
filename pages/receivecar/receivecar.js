const app = getApp()
let interval1, interval2;
Page({


  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    show: false,
    ISBNCode: '',
    carBookList: [],
    allPrice: 0.0,
    statusBarHeight: app.globalData.statusBarHeight,
    isCanCommit: false,
    currentBookCount: 0,
    isContinue: false,
    currentFilterStatus: false,
    filterCarBookList: [],
    showDialogTip: false,
    totalCount: 0,
    text: '7天快速审核到账 做书我们是认真的 （本校站长未入住也可以卖书噢～） 最少满18本或28元才可提交订单', //滚动文字
    duration: 0, //水平滚动方法一中文字滚动总时间
    pace: 1, //滚动速度
    posLeft1: 0, //水平滚动方法二中left值
    posLeft2: 0, //水平滚动方法三中left值
    marginLeft: 60 //水平滚动方法三中两条文本之间的间距
  },

  bindinput(e) {
    this.setData({
      ISBNCode: e.detail.value
    })
  },

  goRule(e) {
    wx.navigateTo({
      url: '/pages/rule/rule'
    })
  },

  question(event) {
    this.setData({
      showDialogTip: !this.data.showDialogTip
    })
  },

  closeDialog(event) {
    this.setData({
      showDialogTip: false,
    })
  },

  singleScanCode() {
    this.setData({
      isContinue: false
    })

    this.scanCode()
  },

  continueScanCode() {
    this.setData({
      isContinue: true
    })

    this.scanCode()
  },


  scanCode: function() {
    var that = this;
    wx.scanCode({
      success: res => {
        //对扫码获得信息的识别操作
        console.log(res)
        var isbn = res.result
        this.searchBookIsbn(isbn)
      },
      fail: function(res) {
        wx.showToast({
          title: '你已经取消了扫描！',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function(res) {},
    })
  },

  upISBN: function() {
    //提交用户输入的ISBN码，转到sellList页面

    var ISBNCode = this.data.ISBNCode;

    this.searchBookIsbn(ISBNCode)

  },

  translateAllPrice() {
    var status = this.data.currentFilterStatus
    var list = this.data.carBookList
    if (status) {
      list = this.data.filterCarBookList
    }
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

    this.updateCommitStatus()
  },

  commit(event) {
    wx.navigateTo({
      url: '/pages/sellList/sellList'
    })
  },

  updateCommitStatus() {
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

    if (currentBookCount < 8 && allPrice < 15) {
      // wx.showModal({
      //   title: '友情提示',
      //   content: '回收书籍最低提交8本或满38元即可回收',
      //   showCancel: false
      // })
      this.setData({
        isCanCommit: false
      })
      return
    }

    // if (currentBookCount > 50) {
    //   // wx.showModal({
    //   //   title: '友情提示',
    //   //   content: '一次订单最多只能提交50本旧书籍',
    //   //   showCancel: false
    //   // })
    //   this.setData({
    //     isCanCommit: false
    //   })
    //   return
    // }

    this.setData({
      isCanCommit: true
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
          wx.setStorageSync('book', res.data.F_data)
          // wx.navigateTo({
          //   url: '/pages/sellList/sellList?mode=' + 999
          // })
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 1000
          })
          this.addNewBook()
        } else {
          console.log(res)
          // if (res.data.F_responseMsg == "此书已拒收"){
          //   wx.showModal({
          //     title: '温馨提示',
          //     content: '抱歉，此书零跑校园暂不回收',
          //     showCancel: false
          //   })
          // }else{
          //   wx.showModal({
          //     title: '温馨提示',
          //     content: '数据库读取数据中，请稍后重试！',
          //     showCancel: false
          //   })
          // }

          wx.showModal({
            title: '温馨提示',
            content: '抱歉该本书暂不回收，请扫描下一本',
            showCancel: false
          })


          wx.showToast({
            title: '继续扫描下一本',
            icon: 'none',
            duration: 1000
          })
        }
      },
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

  next() {

    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })

    if (userInfo.phone == '') {
      wx.showToast({
        title: '请到我的-绑定手机',
        icon: 'none'
      })
      return
    }

    var school = wx.getStorageSync('school')
    if (school == undefined || school.id == undefined || school.id == 0) {
      wx.showToast({
        title: '请先选择学校',
        icon: 'none'
      })
      return
    }

    if (this.data.carBookList.length <= 0) {
      wx.showToast({
        title: '请先扫描书本',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/receivecardetail/receivecardetail',
    })

    if (this.data.currentFilterStatus) {
      wx.setStorage({
        key: 'recevier',
        data: this.data.filterCarBookList,
      })
    } else {
      wx.setStorage({
        key: 'recevier',
        data: this.data.carBookList,
      })
    }
  },

  addNewBook() {
    var isbnBook = wx.getStorageSync('book')

    var currentIndex = this.jdugeIsInCarList(isbnBook)
    if (currentIndex !== -1) {

      var oldList = this.data.carBookList
      // if (oldList[currentIndex].num >= 1) {
      //   wx.showToast({
      //     title: '回收车已有此本书',
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   return
      // }
      oldList[currentIndex].num = oldList[currentIndex].num + 1
      this.setData({
        carBookList: oldList
      })

    } else {
      var oldList = this.data.carBookList
      isbnBook.num = 1
      oldList.push(isbnBook)
      this.setData({
        carBookList: oldList
      })
    }

    wx.setStorage({
      key: 'carList',
      data: this.data.carBookList,
    })
    this.translateAllPrice()
    var that = this
    this.pageScrollToBottom()
    if (this.data.isContinue) {
      wx.showToast({
        title: '已成功扫描，请扫描下一本',
        icon: 'none'
      })
      setTimeout(function() {
        that.scanCode()
      }, 1500)
    }
  },

  pageScrollToBottom: function () {
    wx.createSelectorQuery().select('#page').boundingClientRect(function (rect) {
      if (rect) {
        // 使页面滚动到底部
        console.log(rect.height);
        wx.pageScrollTo({
          scrollTop: rect.height
        })
      }
    }).exec()
  },


  translateFilterList() {
    if (this.data.currentFilterStatus) {
      var carBookList = this.data.carBookList
      var filterCarBookList = new Array
      for (var c = 0; c < carBookList.length; c++) {
        if (carBookList[c].price >= 0.3) {
          filterCarBookList.push(carBookList[c])
        }
      }

      this.setData({
        filterCarBookList: filterCarBookList
      })
    }
  },

  initFilterStatus() {
    this.setData({
      currentFilterStatus: true
    })

    if (this.data.currentFilterStatus) {
      var carBookList = this.data.carBookList
      var filterCarBookList = new Array
      for (var c = 0; c < carBookList.length; c++) {
        if (carBookList[c].price >= 0.3) {
          filterCarBookList.push(carBookList[c])
        }
      }

      this.setData({
        filterCarBookList: filterCarBookList
      })
    }
  },

  clearList() {
    this.setData({
      carBookList: []
    })
    wx.setStorage({
      key: 'carList',
      data: this.data.carBookList,
    })

    this.translateFilterList()
    this.translateAllPrice()
  },

  changeFilterStatus() {
    this.setData({
      currentFilterStatus: !this.data.currentFilterStatus
    })

    if (this.data.currentFilterStatus) {
      var carBookList = this.data.carBookList
      var filterCarBookList = new Array
      for (var c = 0; c < carBookList.length; c++) {
        if (carBookList[c].price >= 0.3) {
          filterCarBookList.push(carBookList[c])
        }
      }

      this.setData({
        filterCarBookList: filterCarBookList
      })
    }
  },

  clear() {
    this.setData({
      carBookList: []
    })
    wx.setStorage({
      key: 'carList',
      data: this.data.carBookList,
    })
  },

  showPopup() {
    //弹出层显示事件
    this.setData({
      show: true
    });
  },

  onClose() {
    //弹出层关闭事件
    this.setData({
      show: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var data = [{
    //   "id": 2292682500962642,
    //   "pic": "http://booklibimg.kfzimg.com/data/book_lib_img_v2/isbn/1/7366/73662b8d8c86734602ded607df62c630_0_1_300_300.jpg",
    //   "price": 3.23,
    //   "originPrice": 17,
    //   "real_price": "88.00",
    //   "name": "机器学习",
    //   "isbn": "9787302423287",
    //   "currentCount": 4,
    //   "coverCount": 99,
    //   "updateTime": "2022-01-02T04:47:15+08:00",
    //   "publishDate": "2016-01",
    //   "publish": "清华大学出版社",
    //   "author": "周志华",
    //   "isRefund": 0,
    //   "isDswGet": 1,
    //   "isFirstOperated": 0,
    //   "num": 4
    // }]
    // wx.setStorage({
    //   key: 'carList',
    //   data: data,
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

    wx.setStorage({
      key: 'carList',
      data: this.data.carBookList,
    })

    this.translateFilterList()
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

    wx.setStorage({
      key: 'carList',
      data: this.data.carBookList,
    })

    this.translateFilterList()
    this.translateAllPrice()
  },

  roll1: function(that, txtLength, windowWidth) {
    interval1 = setInterval(function() {
      if (-that.data.posLeft1 < txtLength) {
        that.setData({
          posLeft1: that.data.posLeft1 - that.data.pace
        })
      } else {
        that.setData({
          posLeft1: windowWidth
        })
      }
    }, 20)
  },
  roll2: function(that, txtLength, windowWidth) {
    interval2 = setInterval(function() {
      if (-that.data.posLeft2 < txtLength + that.data.marginLeft) {
        that.setData({
          posLeft2: that.data.posLeft2 - that.data.pace
        })
      } else { // 第二段文字滚动到左边后重新滚动
        that.setData({
          posLeft2: 0
        })
        clearInterval(interval2);
        that.roll2(that, txtLength, windowWidth);
      }
    }, 20)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var currentCarList = wx.getStorageSync('carList')
    if (currentCarList.length > 0) {
      this.setData({
        carBookList: currentCarList
      })
    } else {
      this.setData({
        carBookList: []
      })
    }

    this.initFilterStatus()
    this.translateAllPrice()

    let that = this;
    let windowWidth = wx.getSystemInfoSync().windowWidth; //屏幕宽度
    // wx.createSelectorQuery().select('#txt1').boundingClientRect(function (rect) {
    //   let duration = rect.width * 0.03;//滚动文字时间,滚动速度为0.03s/px
    //   that.setData({
    //     duration: duration
    //   })
    // }).exec()

    wx.createSelectorQuery().select('#txt2').boundingClientRect(function (rect) {
      let txtLength = rect.width;//滚动文字长度
      that.roll1(that, txtLength, windowWidth);
    }).exec()

    wx.createSelectorQuery().select('#txt3').boundingClientRect(function (rect) {
      let txtLength = rect.width;//文字+图标长度
      that.setData({
        marginLeft: txtLength < windowWidth - that.data.marginLeft ? windowWidth - txtLength : that.data.marginLeft
      })
      that.roll2(that, txtLength, windowWidth);
    }).exec()
  },

  deleteBook(e) {
    var index = e.currentTarget.dataset.index
    var items = this.data.carBookList
    items.splice(index, 1);
    this.setData({
      carBookList: items
    })
    wx.setStorage({
      key: 'carList',
      data: this.data.carBookList,
    })

    this.translateFilterList()
    this.translateAllPrice()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(interval1);
    clearInterval(interval2);
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