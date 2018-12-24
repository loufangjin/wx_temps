//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    perData:'',
    imgUrls: ["/images/pic_article.png","/images/icon_nav_special.png","/images/pic_article.png"],
    indicatorDots: false,
     autoplay: false,
     interval: 5000,
     duration: 1000

  },
  changeIndicatorDots: function(e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function(e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function(e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function(e) {
      this.setData({
        duration: e.detail.value
      })
    },
  bindViewsTap: function() {
    wx.navigateTo({//保留当前页面，跳转
      url: '../pages/maps/maps'
    })
    /*wx.redirectTo({//关闭当前页面，跳转

    }),
    wx.navigateBack({//关闭当前页，返回上一页

    }),
    wx.switchTab({//跳转tabBar页面

    })*/
  },
  bindSetData(){
    var perData = this.perData
    wx.setStorage({
      key:'key',
      data:"完美",
      success:function(res){
        
      },
      fail:function(res){

      },
      complete:function(){

      }
    })
    
  },
  bindGetData(){
    var that = this
    wx.getStorage({
      key:'key',
      success:function(res){
        that.setData({
          perData:res.data
        })
      },
      fail:function(){

      },
      complete:function(){

      }
    })
  },
  bindClearData(){
    wx.removeStorage({
      key:'key',
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
 
})
