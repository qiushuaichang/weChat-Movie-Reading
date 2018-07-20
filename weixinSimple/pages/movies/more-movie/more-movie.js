// pages/movies/more-movie/more-movie.js
var util = require("../../../utils/util.js")

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    totalCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category
    this.setData({
      category: category
    })
    // console.log(category)
    wx.setNavigationBarTitle({ //动态设置导航栏的标题
      title: category
    });
    const DOMAIN = app.globalData.doubanBase;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = DOMAIN + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        dataUrl = DOMAIN + "/v2/movie/coming_soon"
        break;
      case "豆瓣Top250":
        dataUrl = DOMAIN + "/v2/movie/top250"
        break;
    }
    this.setData({
      requestUrl: dataUrl
    })

    util.http(dataUrl, this.processDoubanData)
  },

  processDoubanData: function(moviesDouban) {
    var movies = [];
    for (var i in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[i];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var tem = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(tem)
    }

    //加载更多数据，并且合并旧数据
    var totalMovies = {}
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)

    } else {
      totalMovies = movies
      this.setData({
        isEmpty: false
      })
    }
    this.setData({
      movies: totalMovies,
      totalCount: this.data.totalCount + 20
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  // onScrollLower:function(event){
  //   console.log("加载更多")
  //   var nextUrl = this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
  //   wx.showNavigationBarLoading()
  //   util.http(nextUrl, this.processDoubanData)

  // },
  onReachBottom: function() {
    console.log("上拉触底-加载更多")
    wx.showNavigationBarLoading()
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
  },
  onPullDownRefresh: function() {
    console.log("下拉刷新")
    wx.showNavigationBarLoading();
    wx.showNavigationBarLoading();
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.setData({
      movies: {},
      isEmpty: true,
      totalCount: 0
    })
    util.http(refreshUrl, this.processDoubanData)

  },

  onMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid //会把movieId自动转换成全部小写的movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // wx.setNavigationBarTitle({
    //   title: this.data.category
    // })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})