var order = ['red', 'yellow', 'blue', 'green', 'red']
var imgList = require("../../data/data.js")
var controlWater = false
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    hideHeader:true,
    hideBottom:true,
    imgsList:[],
    topNum:0
  },
  onLoad () {
    let imgsArr = imgList.imgList.posts;
    let newImgList = [];
    if(imgsArr){
      imgsArr.map(item=>{
        newImgList.push(item.imgs)
      })
    }
    console.log('newImgList',newImgList)
    this.setData({
      imgsList:newImgList
    })
  },
  goOutTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  goTop(e){
    this.setData({
      topNum:this.data.topNum = 0
    })
  },
  refreshX(){
    controlWater = true
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function()
      {
        // complete

        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        controlWater = false
      },1000);
    
  },
  loadMoreX(){
    console.log(2)
  },
  refreshY() {
     console.log(1) 
  },
  loadMoreY() {
    console.log(2)
  },
  scrollImg(e) {
    console.log(e.currentTarget.dataset.propId)
    let uniqueId = e.currentTarget.dataset.propId
    wx.navigateTo({
      url:"/pages/details/details?id=" +uniqueId
    })
  },
  handleFather() {
    console.log('fatherBuHuo')
  },
  handleChild() {
    console.log('childBuHuo')
  },
  handleFatherMao(){
    console.log("fatherMao")
  },
  handleChildMao(){
    console.log("childMao")
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onPullDownRefresh() {

  },

})
