// pages/applymaster/applymaster.js
Page({

  /**
   * Page initial data
   */
  data: {
    gradeList: ["大一", "大二", "大三","大四"],
    currentGradeindex: 0,
    currentCount: 0,
    currentSchoolName: "",
    currentPhone:"",
    currentWechat:""
  },

  changeGrade(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentGradeindex: index
    })
  },

  changeCount(event){
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


  apply(){

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})