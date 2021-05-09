const app = getApp()

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
    isCanCommit:false,
    currentBookCount: 0
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

    this.updateCommitStatus()
  },

  commit(event) {
    wx.navigateTo({
      url: '/pages/sellList/sellList'
    })
  },

  updateCommitStatus(){
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
      // wx.showModal({
      //   title: '友情提示',
      //   content: '回收书籍最低提交8本或满38元即可回收',
      //   showCancel: false
      // })
      this.setData({
        isCanCommit:false
      })
      return
    }

    if (currentBookCount > 50) {
      // wx.showModal({
      //   title: '友情提示',
      //   content: '一次订单最多只能提交50本旧书籍',
      //   showCancel: false
      // })
      this.setData({
        isCanCommit: false
      })
      return
    }

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
          wx.setStorageSync('book',res.data.F_data)
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
          wx.showModal({
            title: '温馨提示',
            content: '数据库读取数据中，请稍后重试！',
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

  addNewBook() {
    var isbnBook = wx.getStorageSync('book')

    var currentIndex = this.jdugeIsInCarList(isbnBook)
    if (currentIndex !== -1) {
      
      var oldList = this.data.carBookList
      if (oldList[currentIndex].num >= 1){
        wx.showToast({
          title: '一个订单最多提交1本相同的书籍',
          icon: 'none',
          duration: 2000
        })
        return
      }
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
    var currentCarList = wx.getStorageSync('carList')
    if (currentCarList.length > 0) {
      this.setData({
        carBookList: currentCarList
      })
    }else{
      this.setData({
        carBookList: []
      })
    }

    this.translateAllPrice()
    console.log(currentCarList)
  },

  deleteBook(e){
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
    this.translateAllPrice()
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