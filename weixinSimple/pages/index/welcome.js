//index.js
//获取应用实例
const app = getApp()

Page({ // Page({}) 是在js文件中必须得
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onTap: function(event) {
    wx.switchTab({    //只跳转到tabBar页面
      url: '../posts/post'
    })
    wx.redirectTo({    //页面之间平行跳转，可以返回
      url: '../posts/post'
    })
    // wx.redirectTo({ //页面没法返回
    //   url: '../posts/post',
    // })
  },
  onLoad: function() {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  onUnload: function() { //wx.redirectTo()时执行，页面注释或卸载时
    // console.log("onUnload")
  },
  onHide: function() { //wx.navigateTo()时执行，页面隐藏时
    // console.log("onHide")
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})