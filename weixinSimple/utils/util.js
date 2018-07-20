const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function convertToStarsArray(stars) {
  //把subjects.rating.stars 中的stars:"35"(三个半星星)，"40"（四个星星）等，第一个数字提取出来，
  var num = stars.toString().substring(0, 1)
  var arr = [];
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      arr.push(1)
    } else {
      arr.push(0)
    }
  }
  return arr      //[1,1,1,0,0]数组中的0，1(其实就是false,true)是为前端页面渲染做判断用的，
}

function convertToCastString(casts){
  var castsJoin = ""
  for(var i in casts){
    castsJoin += casts[i].name+" / "
  }
  return castsJoin.substring(0, castsJoin.length-2)
}

function convertToCastInfos(casts){
  var castsArr = []
  for(var i in casts){
    var cast = {
      img:casts[i].avatars?casts[i].avatars.large:"",
      name:casts[i].name
    }
    castsArr.push(cast)
  }
  return castsArr
}

function http(url,callBack) {
  var that = this;
  wx.request({
    url: url,
    success: function (res) {
      callBack(res.data)
    },
    fail: function () {
      console.log("调用失败")
    }
  })
}


module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}