// pages/poster/poster.js
const qiniuUploader = require("../../utils/qiniuUploader");

// 初始化七牛云相关配置
function initQiniu() {
  var options = {
    // bucket所在区域，这里是华北区。ECN, SCN, NCN, NA, ASG，分别对应七牛云的：华东，华南，华北，北美，新加坡 5 个区域
    region: 'SCN',

    // 获取uptoken方法三选一即可，执行优先级为：uptoken > uptokenURL > uptokenFunc。三选一，剩下两个置空。推荐使用uptokenURL，详情请见 README.md
    // 由其他程序生成七牛云uptoken，然后直接写入uptoken
    uptoken: '4DRRGb2hlmHJkc8Pr86cTrENdw2nW0Jt_g0y_8Kw:n5oXWqpv-t0_rxmkkwzcaTp9pjA=:eyJzY29wZSI6ImxleWUiLCJkZWFkbGluZSI6MTY1MDc4MDg1NX0=',
    // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "0MLvWPnyy..."}
    uptokenURL: '',
    // uptokenFunc 这个属性的值可以是一个用来生成uptoken的函数，详情请见 README.md
    uptokenFunc: function() {},

    // bucket 外链域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 fileURL 字段。否则需要自己拼接
    domain: 'https://resource.qimsj.com',
    // qiniuShouldUseQiniuFileName 如果是 true，则文件的 key 由 qiniu 服务器分配（全局去重）。如果是 false，则文件的 key 使用微信自动生成的 filename。出于初代sdk用户升级后兼容问题的考虑，默认是 false。
    // 微信自动生成的 filename较长，导致fileURL较长。推荐使用{qiniuShouldUseQiniuFileName: true} + "通过fileURL下载文件时，自定义下载名" 的组合方式。
    // 自定义上传key 需要两个条件：1. 此处shouldUseQiniuFileName值为false。 2. 通过修改qiniuUploader.upload方法传入的options参数，可以进行自定义key。（请不要直接在sdk中修改options参数，修改方法请见demo的index.js）
    // 通过fileURL下载文件时，自定义下载名，请参考：七牛云“对象存储 > 产品手册 > 下载资源 > 下载设置 > 自定义资源下载名”（https://developer.qiniu.com/kodo/manual/1659/download-setting）。本sdk在README.md的"常见问题"板块中，有"通过fileURL下载文件时，自定义下载名"使用样例。
    shouldUseQiniuFileName: false
  };
  // 将七牛云相关配置初始化进本sdk
  qiniuUploader.init(options);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userWxInfo: {
      avatarUrl: "", //用户头像0
      nickName: "", //用户昵称
    },
    imgPath1: "",
    imgPath2: "",
    imgPath3: "",
    loadingStatus: false,
    imageTempPath: '',
    imgSrc: '',
    // 图片上传（从相册）返回对象。上传完成后，此属性被赋值
    imageObject: {},
    // 文件上传（从客户端会话）返回对象。上传完成后，此属性被赋值
    messageFileObject: {},
    // 图片上传（从相册）进度对象。开始上传后，此属性被赋值
    imageProgress: {},
    // 文件上传（从客户端会话）进度对象。开始上传后，此属性被赋值
    messageFileProgress: {},
    // 文件在线查看来源fileUrl
    viewFileOnlineFileUrl: '',
    // 文件下载进度对象。用于文件在线查看前的预下载
    downloadFileProgress: {},
    // 此属性在qiniuUploader.upload()中被赋值，用于中断上传
    cancelTask: function() {}
  },

  save(e) {
    if (this.data.loadingStatus) {
      this.downloadimg()
    } else {
      wx.showToast({
        title: '海报暂未生成完毕，请稍候重试',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var avatarUrl = options.avatarUrl
    initQiniu();
    var userInfo = wx.getStorageSync('userInfo')
    userInfo.avatarUrl = avatarUrl
    this.setData({
      userInfo: userInfo
    })

    this.uploadCanvas()
  },

  // 圆形图片
  circleImg: function(ctx, img, x, y, r) {
    ctx.save()
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore()
  },

  uploadCanvas() {
    wx.showLoading({
      title: '正在生成中',
    })
    var that = this;
    var context = wx.createCanvasContext('post-cv');

    const info = wx.getSystemInfoSync();
    const windowWidth = info.windowWidth;
    const windowHeight = info.windowHeight;
    wx.getImageInfo({
      src: "https://ebag-exam.oss-cn-shenzhen.aliyuncs.com/show/share.png",
      success: function(res) {
        var path = res.path;
        context.drawImage(path, 0, 0, windowWidth, windowHeight * 0.9)
        var codePath = that.data.userInfo.code.replace("http", "https")
        wx.getImageInfo({
          src: codePath,
          success: function(res1) {
            var path1 = res1.path;
            context.drawImage(path1, windowWidth * 0.62, windowHeight * 0.68, 110, 110);
            wx.getImageInfo({
              src: that.data.userInfo.avatarUrl,
              success: function(res2) {
                var path2 = res2.path;

                // context.drawImage(path2, windowWidth * 0.70, windowHeight * 0.72, 50, 50);

                var width = 50
                var height = 50
                var x = windowWidth * 0.62 + 28
                var y = windowHeight * 0.68 + 28
                var radio = 1

                context.save();
                context.arc(width / 2 + x, height / 2 + y, width / 2 + 5 * radio, 0, Math.PI * 2, false);
                context.setFillStyle('#fff')
                context.fill()
                context.clip();
                context.beginPath();
                context.arc(width / 2 + x, height / 2 + y, width / 2, 0, Math.PI * 2, false);
                context.clip();
                context.drawImage(path2, x, y, width, height);
                context.restore()

                context.font = 'normal 11px sans-serif';
                context.setFontSize(14);
                context.setFillStyle('#333333');
                context.fillText('扫描右侧二维码', windowWidth * 0.12, windowHeight * 0.705)

                context.font = 'normal 11px sans-serif';
                context.setFontSize(15);
                context.setFillStyle('#55ADFF');
                context.fillText('旧书轻松变现 领大额购书券', windowWidth * 0.12, windowHeight * 0.74);

                context.font = 'normal 11px sans-serif';
                context.setFontSize(12);
                context.setFillStyle('#333333');
                context.fillText('扫码轻松下单，书本按本回收', windowWidth * 0.12, windowHeight * 0.780);

                context.font = 'normal 11px sans-serif';
                context.setFontSize(12);
                context.setFillStyle('#333333');
                context.fillText('快递免费上门取件', windowWidth * 0.12, windowHeight * 0.81);

                context.font = 'normal 11px sans-serif';
                context.setFontSize(12);
                context.setFillStyle('#333333');
                context.fillText('审核完成轻松提现', windowWidth * 0.12, windowHeight * 0.84);


                context.save();
                context.beginPath();
                context.arc(windowWidth * 0.12 - 8, windowHeight * 0.78 - 6, 2.5, 0, Math.PI * 2, false);
                context.setFillStyle('#55ADFF')
                context.fill()
                context.clip();
                context.restore()

                context.save();
                context.beginPath();
                context.arc(windowWidth * 0.12 - 8, windowHeight * 0.81 - 6, 2.5, 0, Math.PI * 2, false);
                context.setFillStyle('#55ADFF')
                context.fill()
                context.clip();
                context.restore()

                context.save();
                context.beginPath();
                context.arc(windowWidth * 0.12 - 8, windowHeight * 0.84 - 6, 2.5, 0, Math.PI * 2, false);
                context.setFillStyle('#55ADFF')
                context.fill()
                context.clip();
                context.restore()

                context.draw()

                that.setData({
                  loadingStatus: true
                })

                setTimeout(function() {
                  wx.canvasToTempFilePath({
                    canvasId: 'post-cv',
                    fileType: 'jpg',
                    quality: 1,
                    destWidth: windowWidth,
                    destHeight: windowHeight * 0.9,
                    success: function(res) {
                      console.log(res)
                      wx.hideLoading()
                      // 获得图片临时路径
                      setTimeout(function() {
                        that.setData({
                          imageTempPath: res.tempFilePath,
                          imgSrc: that.imageTempPath,
                        })
                      }, 50)
                    }
                  })
                }, 50)
              },fail :(res)=>{
                console.log(res)
              }
            })
          }
        })
      }
    })
  },

  downloadimg: function() {
    var url = this.data.imageTempPath
    // 通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope

    var that = this

    wx.showLoading({
      title: '正在保存中',
    })

    qiniuUploader.upload(url, (res) => {
      that.setData({
        'imageObject': res
      });
      console.log('file url is: ' + res.fileURL);
      var qiniuUrl = res.fileURL
      wx.getSetting({
        success(res) {
          console.log(res)
          if (!res['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                wx.downloadFile({
                  url: qiniuUrl,
                  success: function (res) {
                    console.log(res)
                    wx.saveImageToPhotosAlbum({
                      filePath: res.tempFilePath,
                      success(res) {
                        console.log(res);
                        wx.hideLoading()
                        wx.showToast({
                          title: "保存成功",
                          duration: 2000
                        })
                      },
                      fail(res) {
                        console.log(res);
                      },
                      complete(res) {
                        console.log(res);
                      }
                    })
                  }
                })
              }
            })
          } else {
            console.log('error');
          }
        }

      })
    }, (error) => {
      console.error('error: ' + JSON.stringify(error));
    });

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

  },

  // 图片上传（从相册）方法
  didPressChooesImage: function() {
    var that = this;
    didPressChooesImage(that);
  },
  // 文件上传（从客户端会话）方法，支持图片、视频、其余文件 (PDF(.pdf), Word(.doc/.docx), Excel(.xls/.xlsx), PowerPoint(.ppt/.pptx)等文件格式)
  didPressChooesMessageFile: function() {
    var that = this;
    didPressChooesMessageFile(that);
  },
  // 在线查看文件的fileUrl输入框，输入完毕后点击确认
  didPressViewFileOnlineInputConfirm: function(event) {
    var that = this;
    didPressViewFileOnlineInputConfirm(that, event);
  },
  // 在线查看文件，支持的文件格式：pdf, doc, docx, xls, xlsx, ppt, pptx。关于wx.openDocument方法，详情请参考微信官方文档：https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.openDocument.html
  didPressViewFileOnline: function() {
    var that = this;
    didPressViewFileOnline(that);
  },
  // 中断上传方法
  didCancelTask: function() {
    this.data.cancelTask();
  }
})