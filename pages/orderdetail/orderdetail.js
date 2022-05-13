// pages/buyorderdetail/buyorderdetail.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    orderDetail: {},
    orderStatus: ["待付款", "待发货", "待收货", "待发货", "退款/售后"],
    quality: ["一般", "全新", "良好"],
    currentStatus: "",
    tracks: [],
    showTime: [],
    mainHeight: 0,
    passCount: 0,
  },

  copy(e){
    wx.setClipboardData({
      data: 'yuxiukeji',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '客服微信复制成功',
              icon: 'none'
            })
          }
        })
      }
    })
  },

  back(e) {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    // var orderDetail = wx.getStorageSync("buyorderdetail")

    // orderDetail.showCancel = false
    // orderDetail.showSend = false
    // orderDetail.showCreate = false
    // orderDetail.showPay = false
    // orderDetail.showComplete = false

    // if (orderDetail.createTime.indexOf("00:00:00") == -1) {
    //   orderDetail.showCreate = true
    // }

    // if (orderDetail.sendTime.indexOf("00:00:00") == -1) {
    //   orderDetail.showSend = true
    // }

    // if (orderDetail.cancelTime.indexOf("00:00:00") == -1) {
    //   orderDetail.showCancel = true
    // }

    // if (orderDetail.payTime.indexOf("00:00:00") == -1) {
    //   orderDetail.showPay = true
    // }

    // if (orderDetail.completeTime.indexOf("00:00:00") == -1) {
    //   orderDetail.showComplete = true
    // }

    // console.log(orderDetail)

    // this.setData({
    //   orderDetail: orderDetail
    // })

    this.getOrderDatail(options.id)
    // this.getOrderDatail(2411585580120769)

    var windowHeight = wx.getSystemInfoSync().windowHeight
    var mainHeight = (windowHeight * this.getRpx() - 330 * this.getRpx()) / this.getRpx()
    this.setData({
      mainHeight: mainHeight
    })
  },

  /* utils/util.js */
  //获取px与rpx之间的比列 
  getRpx() {
    var winWidth = wx.getSystemInfoSync().windowWidth
    return 750 / winWidth
  },

  getOrderDatail(id) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/order/detail',
      data: {
        id: id,
      },
      method: 'GET',
      success: res => {
        var order = res.data.F_data
        var totalCount = 0
        var passCount = 0
        for (var o = 0; o < order.orderBooks.length; o++) {
          totalCount = totalCount + order.orderBooks[o].count
          passCount = passCount + order.orderBooks[o].realCount
        }
        order.count = totalCount
        this.setData({
          orderDetail: order,
          passCount: passCount
        })

        // var currentCity = ""
        // switch (this.data.orderData.addressId) {
        //   case 1:
        //     currentCity = "浙江"
        //     break
        //   case 2:
        //     currentCity = "安徽"
        //     break
        //   case 3:
        //     currentCity = "江苏"
        //     break
        //   default:
        //     currentCity = "未知"
        //     break
        // }

        var statusName = ""
        switch (this.data.orderDetail.status) {
          case 1:
            statusName = "待确认"
            break;
          case 2:
            statusName = "待取件"
            break;
          case 3:
            statusName = "待审核"
            break;
          case 4:
            statusName = "审核完毕"
            break;
          case -1:
            statusName = "订单已取消"
            break;
          default:
            statusName = "未知订单状态"
            break;
        }

        this.setData({
          currentStatus: statusName,
        })

        var showTime = new Array
        var orderDetail = this.data.orderDetail
        orderDetail.showCancel = false
        orderDetail.showWl = false
        orderDetail.showCreate = false
        orderDetail.showPay = false
        orderDetail.showComplete = false
        orderDetail.showReceipt = false

        if (orderDetail.createTime.indexOf("00:00:00") == -1) {
          orderDetail.showCreate = true

          var timeSimple = new Object
          timeSimple.name = "提交订单"
          timeSimple.time = orderDetail.createTime
          showTime.push(timeSimple)
        } else {
          var timeSimple = new Object
          timeSimple.name = "提交订单"
          timeSimple.time = ""
          showTime.push(timeSimple)
        }

        if (orderDetail.inquiryTime.indexOf("00:00:00") == -1) {
          orderDetail.showCreate = true

          var timeSimple = new Object
          timeSimple.name = "待确认"
          timeSimple.time = orderDetail.inquiryTime
          showTime.push(timeSimple)
        } else {
          var timeSimple = new Object
          timeSimple.name = "待确认"
          timeSimple.time = ""
          showTime.push(timeSimple)
        }


        if (orderDetail.wlTime.indexOf("00:00:00") == -1) {
          orderDetail.showWl = true

          var timeSimple = new Object
          timeSimple.name = "待取件"
          timeSimple.time = orderDetail.wlTime
          showTime.push(timeSimple)
        } else {
          var timeSimple = new Object
          timeSimple.name = "待取件"
          timeSimple.time = ""
          showTime.push(timeSimple)
        }

        if (orderDetail.receiptTime.indexOf("00:00:00") == -1) {
          orderDetail.showReceipt = true

          var timeSimple = new Object
          timeSimple.name = "待审核"
          timeSimple.time = orderDetail.receiptTime
          showTime.push(timeSimple)
        } else {
          var timeSimple = new Object
          timeSimple.name = "待审核"
          timeSimple.time = ""
          showTime.push(timeSimple)
        }

        if (orderDetail.payTime.indexOf("00:00:00") == -1) {
          orderDetail.showPay = true
        }

        if (orderDetail.cancelTime.indexOf("00:00:00") == -1 && orderDetail.cancelTime != "") {
          orderDetail.showCancel = true

          var timeSimple = new Object
          timeSimple.name = "取消订单"
          timeSimple.time = orderDetail.cancelTime
          showTime.push(timeSimple)
        } else {
          if (orderDetail.completeTime.indexOf("00:00:00") == -1) {
            orderDetail.showComplete = true

            var timeSimple = new Object
            timeSimple.name = "已完成"
            timeSimple.time = orderDetail.completeTime
            showTime.push(timeSimple)
          } else {
            var timeSimple = new Object
            timeSimple.name = "已完成"
            timeSimple.time = ""
            showTime.push(timeSimple)
          }
        }

        this.setData({
          orderDetail: orderDetail,
          showTime: showTime
        })


        var wlnumber = orderDetail.wlNumber
        console.log(orderDetail)
        if (wlnumber !=undefined && (wlnumber.indexOf("JDV") != -1 || wlnumber.indexOf("QWD") != -1)) {
          this.getTrackDatail2(wlnumber)
        } else {
          if (orderDetail.orderNo) {
            this.getTrackDatail(this.data.orderDetail.orderNumber)
          }
        }
      },
    })
  },

  getTrackDatail2(wlNumber) {
    console.log(wlNumber)
    wx.request({
      url: app.globalData.baseUrl + '/v1/order/track2',
      data: {
        wlNumber: wlNumber,
      },
      method: 'GET',
      success: res => {
        console.log(res)
        this.setData({
          tracks: res.data.F_data.jingdong_trace_dynamicQueryService_queryDynamicTraceInfo_responce.response.data
        })
      },
    })
  },

  getTrackDatail(orderNo) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/order/track',
      data: {
        orderNo: orderNo,
      },
      method: 'GET',
      success: res => {
        this.setData({
          tracks: res.data.F_data.jingdong_eclp_co_gotoB2BSWbMainAllTrack_responce.CoCreateLwbResult_result.b2bLwbTrack
        })
      },
    })
  },

  goToTrack(event) {
    var orderNo = event.currentTarget.dataset.orderno;
    var wllnumber = event.currentTarget.dataset.wllnumber;
    var wlnumber = event.currentTarget.dataset.wlnumber;
    wx.navigateTo({
      url: '/pages/track/track?orderNo=' + orderNo + "&wlnumber=" + wlnumber + "&wllnumber=" + wllnumber,
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