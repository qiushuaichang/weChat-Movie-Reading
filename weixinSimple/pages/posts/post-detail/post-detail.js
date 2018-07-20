// pages/posts/post-detail/post-detail.js

var postsData = require("../../../data/posts-data.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic: false,
    isCollected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var globlaData = app.globalData.g_isPlayMusic
    // console.log(globlaData)
    var postId = options.id
    var postData = postsData.postList[postId]
    this.setData({
      currentPostId: postId,
      postData: postData
    })
    // console.log(this.data.postData)

    //设置缓存
    // wx.setStorage({     //异步缓存
    //   key: '风暴英雄',
    //   data: '暴雪',
    // })

    // wx.setStorageSync('key', '风暴英雄')    //同步缓存

    // wx.setStorageSync('key', {
    //   game:"风暴英雄",
    //   developer:"暴雪"
    // })

    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        isCollected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }

    if (app.globalData.g_isPlayMusic && app.globalData.g_currentMusicPostId === postId){
      that.setData({
        isPlayMusic: true
      })
    }

    this.setMusicMonitor();

    
  },

  setMusicMonitor:function(){
    var that = this
    wx.onBackgroundAudioPlay(function (event) {
      that.setData({
        isPlayMusic: true,
        g_isPlayMusic: true,
        g_currentMusicPostId: that.data.currentPostId
      })
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayMusic: false,
        g_isPlayMusic: false,
        g_currentMusicPostId: null
      })
    })
    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlayMusic: false,
        g_isPlayMusic: false,
        g_currentMusicPostId: null
      })
    })
  },

  onCollectionTap: function(event) {
    // var game = wx.getStorageSync('key')
    // console.log(game)
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId]
    postCollected = !postCollected

    postsCollected[this.data.currentPostId] = postCollected

    // this.showModal(postsCollected, postCollected)
    this.showToast(postsCollected, postCollected)

  },

  showToast: function(postsCollected, postCollected) {
    var that = this;
    //文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected)

    //更新绑定数据，从而实现图片切换
    this.setData({
      isCollected: postCollected
    })

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      mask: true
    })
  },

  showModal: function(postsCollected, postCollected) {
    var that = this
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章？' : '取消收藏该文章？',
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#3CC51F',
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected)

          //更新绑定数据，从而实现图片切换
          that.setData({
            isCollected: postCollected
          })
        }
      }
    })
  },

  onShareTap: function(event) {
    // wx.removeStorageSync('key') 
    // wx.clearStorageSync()   //清除所有缓存
    var itemList = [
      "微信好友",
      "微信朋友圈",
      "QQ",
      "微博",
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancel
        // res.tapIndex   //itemList数组中的元素，从0开始
        wx.showModal({
          title: '用户分享到了' + itemList[res.tapIndex],
          content: '用户是否取消？' + res.cancel + '暂时不能实现分享功能'
        })
      }
    })
  },

  onMusicTap: function(event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId].music;
    var isPlayMusic = this.data.isPlayMusic;
    if (isPlayMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayMusic: false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.url,
        title: postData.title,
        coverImgUrl: postData.coverImg
      });
      this.setData({
        isPlayMusic: true
      })
    }

    
  },

  getPostsCollectedAsy: function() { //异步缓存----对比onCollectionTap
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function(res) {
        var postsCollected = res.data; //从这往后开始一样了
        var postsCollected = wx.getStorageSync('posts_collected')
        var postCollected = postsCollected[that.data.currentPostId]
        postCollected = !postCollected

        postsCollected[that.data.currentPostId] = postCollected

        // that.showModal(postsCollected, postCollected)
        that.showToast(postsCollected, postCollected)
      }
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