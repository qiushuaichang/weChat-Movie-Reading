// pages/posts/post.js

var postsData = require("../../data/posts-data.js") //只能用相对路径

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:[],
    postItemClickDta: {
      // iscollection: false,
      // isreading: false,
      // collectionNum: 0,
      // readingNum: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      postList: postsData.postList,
    })
  },

  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postId //这样才能获取到前端自定义的数据，这里是获取的postId
    console.log("onPostTap")
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  onSwiperTap: function(event) {
    // target  currentTarget
    // target 指的是当前点击的组件     currentTarget指的是当前事件捕获的组件
    // target指的是image    currentTarget指的是swiper组件
    var postId = event.target.dataset.postId //这样才能获取到前端自定义的数据，这里是获取的postId
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  onCollectionCountTap: function(event) {
    var that = this;
    var postId = event.currentTarget.dataset.postId;
    var postData = this.data.postList[postId];
    var collectionNum = 'this.data.postList['+postId+'].collection';
    console.log(postData)
    that.setData({
      [collectionNum]: Number(postData.collection) + 1
    })
    console.log(that.data.postList[postId])
    this.data.postList[postId].collection = 111
    console.log(postData)
  },

  onReadingCountTap: function(event) {
    console.log(event)
    console.log("onReadingCountTap")
    var readingNum = event.currentTarget.dataset.readingNum
    this.setData({
      postItemsReadingNum: readingNum
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // console.log("onReady")
  },

})