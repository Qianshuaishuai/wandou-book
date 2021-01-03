let app = getApp()
Page({

  onSearch() {
    //搜索框搜索事件监听

  },

  onChange(e) {
    this.setData({
      value: e.detail
    });

    this.searchBook(e.detail)
  },

  searchBook(str){
    wx.request({
      url: app.globalData.baseUrl + '/v1/book/searchname',
      data: {
        name: str,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        this.setData({
          bookList:res.data.F_data
        })
        console.log(this.data.bookList)
      },
    })
  },

  onCancel() {
    //搜索框取消事件监听
    wx.navigateBack({
      
    })
  },

  addCar(e){
    var index = e.currentTarget.dataset.index
    wx.setStorage({
      key: 'book',
      data: this.data.bookList[index],
    })
    wx.navigateTo({
      url: '/pages/sellList/sellList?mode=' + 999
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    // bookInfo: [{
    //   name: "算计",
    //   price: "2.00",
    //   src: "/assets/images/book1.jpg"
    // },
    // {
    //   name: "中国史学史稿",
    //   price: "4.50",
    //   src: "/assets/images/book2.jpg"
    // },
    // {
    //   name: "不存在的女孩",
    //   price: "3.00",
    //   src: "/assets/images/book3.jpg"
    // },
    // {
    //   name: "护士的故事",
    //   price: "6.20",
    //   src: "/assets/images/book4.jpg"
    // },
    // {
    //   name: "人间游戏",
    //   price: "3.35",
    //   src: "/assets/images/book5.jpg"
    // },
    // {
    //   name: "政府监管的新视野",
    //   price: "4.00",
    //   src: "/assets/images/book6.jpg"
    // },
    // {
    //   name: "厄普代克短篇小说集",
    //   price: "2.56",
    //   src: "/assets/images/book7.jpg"
    // }]
    bookList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchBook()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})