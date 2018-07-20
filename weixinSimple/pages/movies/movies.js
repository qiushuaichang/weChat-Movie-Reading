// pages/movies/movies.js
var util = require("../../utils/util.js")

var domain = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: "",
    inputVlaue: "",
    containerShow: true,
    searchPanelShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const DOMAIN = domain.globalData.doubanBase;
    var dataNum = "?start=0&count=3";
    var inTheaterUrl = DOMAIN + "/v2/movie/in_theaters" + dataNum;
    var comingSoonUrl = DOMAIN + "/v2/movie/coming_soon" + dataNum;
    var top250Url = DOMAIN + "/v2/movie/top250" + dataNum;
    this.getMovieListData(inTheaterUrl, "inTheaters", "正在热映")
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映")
    this.getMovieListData(top250Url, "top250", "豆瓣Top250")
  },

  getMovieListData: function(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      success: function(res) {
        // console.log(res)
        // this.processDoubanData(res)
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function() {
        console.log("调用失败")
      }
    })
  },

  processDoubanData: function(moviesDouban, settedKey, categoryTitle) {
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
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData)
  },

  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category

    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },

  onBindFocus: function(event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    })
  },

  onCancelImgTap: function(event) {
    console.log(event)
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: "",
      inputVlaue: ""
    })

  },

  onBindConfirm: function(event) {
    // "/v2/movie/search?q="
    var text = event.detail.value;
    var searchUrl = domain.globalData.doubanBase + "/v2/movie/search?q=" + text
    this.getMovieListData(searchUrl, "searchResult", "")
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid       //会把movieId自动转换成全部小写的movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
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