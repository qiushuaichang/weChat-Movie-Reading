// pages/movies/movie-detail/movie-detail.js
// var util = require("../../../utils/util.js")
import {
  Movie
} from "class/Movie.js"
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '影片详情',
    })
    var movieId = options.id; //接收上级带过来的参数，所以就取得参数对应的值
    // "/v2/movie/subject/:id"
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;

    // util.http(url, this.processDoubanData)

    var movie = new Movie(url);
    movie.getMovieData((movie) =>
      this.setData({
        movie: movie
      })
    )

  },

  // processDoubanData:function(data){
  //   if (!data){
  //     return
  //   }
  //   var director={
  //     avatar:"",
  //     name:"",
  //     id:""
  //   }
  //   // console.log(data)
  //   if (data.directors[0]!=null){
  //     if (data.directors[0].avatars != null){
  //       director.avatar = data.directors[0].avatars.large
  //     }
  //     director.name = data.directors[0].name
  //     director.id = data.directors[0].id
  //   }

  //   var movie = {
  //     movieImg: data.images ? data.images.large : "",
  //     country: data.countries[0],
  //     title: data.title,
  //     originalTitle: data.original_title,
  //     wishCount: data.wish_count,
  //     commentCount: data.comments_count,
  //     year: data.year,
  //     generes: data.genres.join("、"),
  //     stars: util.convertToStarsArray(data.rating.stars),
  //     score: data.rating.average,
  //     director: director,
  //     casts: util.convertToCastString(data.casts),
  //     castsInfo: util.convertToCastInfos(data.casts),
  //     summary: data.summary
  //   }

  //   this.setData({
  //     movie:movie
  //   })
  // },

  viewMoviePostImg: function(event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
      current: src
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