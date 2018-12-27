// pages/music/music.js
//本地js文件的引入使用require 并且是相对路径
//https://blog.csdn.net/xxhdcblogzh888/article/details/76595307 详解
var musicLsit = require("../../data/music.js");
var innerAudioContext  = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: 'http://pic.pimg.tw/pam86591/1408719752-3322564110_n.jpg',
    sliderValue:0,
    duration:0,
    showduration:0,
    curTime:0,
    showcurTimeVal:0,
    musicName:"lfj",
    animationData:{},
    pauseStatus:true,
    musicUrl:"http://static.missevan.com/MP3/201705/08/c8ab947c6a85092e5ffadcf02bbe348b184435.mp3"
  },

  jumpToSongList: function (e) {

  },
  setStopState(){ //停止播放，再次播放的时候重最开始播放
    this.setData({
      curTimeVal: 0
    })
    innerAudioContext.stop()
  },
  bindSliderchange(e) { //滑块滑动播放进度
    var _this = this
    if(_this.data.duration<=0){
       wx.showToast({
         title: '正在加载',
         icon: "none",
         duration: 2000
       })
       return
     }
     var curval = e.detail.value; //滑块拖动的当前值
     _this.setData({
       showcurTimeVal:_this.formseconds(curval)
     })
     if(curval>=_this.data.duration){
       /**此处为重置 */
       curval=0;
       wx.showToast({
         title: '即将重新播放',
         icon:"none",
         duration:2000
       })
     }
     innerAudioContext.seek(curval); //让滑块跳转至指定位置
  },
  playType() {
      //单曲循环、全部播放完之后再一次循环
  },
  last() {

  },
  play() {
    var _this = this
    if(_this.data.pauseStatus === true){//pauseStatus === false 播放状态
        innerAudioContext.src = "http://static.missevan.com/MP3/201705/08/c8ab947c6a85092e5ffadcf02bbe348b184435.mp3";
        innerAudioContext.play(); //注意位置 获取的url要在前
        innerAudioContext.onPlay(() => {

        })
        _this.commonChange();
        _this.setData({pauseStatus: false})
    }else{
        _this.setData({pauseStatus: true})
        innerAudioContext.pause();
    }
  },
  formseconds: function (s) {
   var t;
   if (s) {
     var hour = parseInt(s/3600)>9?parseInt(s/3600):"0"+parseInt(s/3600);
     var min = parseInt((s% 3600)/ 60)>9? parseInt((s %3600)/60) : "0" + parseInt((s% 3600)/60);
     var sec = parseInt((s%3600) % 60) > 9 ? parseInt((s % 3600) % 60) : "0" + parseInt((s % 3600) % 60);
    t=hour+":"+min+":"+sec
   }
   return t;
  }, 
  next() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  commonChange(){
    var _this = this
    innerAudioContext.onTimeUpdate(()=>{
      _this.setData({
        curTime:innerAudioContext.currentTime, //当前位置
        showcurTimeVal:_this.formseconds(innerAudioContext.currentTime),
        sliderValue:innerAudioContext.currentTime //滑块进度等于currentTime
      })
      //当前音频的长度（单位 s）innerAudioContext.duration
      //innerAudioContext.currentTime, //当前位置
      //innerAudioContext.onTimeUpdate() 监听背景音频播放进度更新事件
      //innerAudioContext.duration 总长度
      if(!this.data.showduration){
        _this.setData({
          duration: innerAudioContext.duration,
          showduration: _this.formseconds(innerAudioContext.duration)
        })
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      musicSingle:"http://static.missevan.com/coversmini/201705/08/c59609b2e5c66fe3f38187807ddcf277184434.jpg"
    });
    this.commonChange() //每一次改变都要触发这里的事件
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})