// pages/details/details.js
var details = require("../../data/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let detailsList = [];
    let that = this;
    let optionsId = options.id;
    details.imgList.posts.map(item=>{
      detailsList.push(item.imgs)
    })
    let postData = detailsList[optionsId]
    that.setData({
      detailsObj:postData
    })
    that.setData({
      ownId:optionsId
    })
    that.setData({
      post_key: postData
    })
    //var postsCollected={ //思路核心
      //  0:"true",
      //  1:"false",
      //  2:"true",
      // }
      //读取缓存状态true/false
      //中间变量来postCollected获取rue/false
      //同步下进行，不建议异步，异步使用需要业务解耦的时候，订单处理使用异步，因为这收藏是一步关联一步，不能跨步操作
    var postsCollected = wx.getStorageSync("key")  //第一次false
    if(postsCollected){ //初次
      var postsCollected = postsCollected[optionsId]
      that.setData({
        isData:postsCollected //true
      })
    }else {
      var postsCollected = {}
      postsCollected[optionsId] = false
      //第一次 var postsCollected={
      //  0:"false",
      //}
      wx.setStorageSync("key",postsCollected) //第一次设置false缓存

    }
  },
  setRecive(e) { //这里是有catch:tab就不触发事件?
     //第一次 var postsCollected={
      //  0:"false",
      //}
    var postsCollected = wx.getStorageSync('key') //postsCollected对象 //同步直接获取对象

    var postCollected = postsCollected[this.data.ownId] //第一次false
    postCollected = !postCollected
    this.setData({
      isData:postCollected
    })
    postsCollected[this.data.ownId] = postCollected
    // wx.setStorageSync("key",postsCollected)
    //第一次之后postsCollected:true,postCollected：true
    //this.showModal(postsCollected,postCollected)
    this.showToast(postsCollected,postCollected)
    /*var that = this 
    var postsCollected = wx.getStorage({ //异步操作和同步操作的差距
      key:"key",
      success:function(res){ //异步要在res中获取对象
        var postsCollected = res.data
        var postCollected = postsCollected[that.data.ownId] //第一次false
        postCollected = !postCollected
        that.setData({
          isData:postCollected
        })
        postsCollected[that.data.ownId] = postCollected
        // wx.setStorageSync("key",postsCollected)
        //第一次之后postsCollected:true,postCollected：true
        //that.showModal(postsCollected,postCollected)
        that.showToast(postsCollected,postCollected)
      }
    })*/

  },
  showModal(postsCollected,postCollected){
    var that = this
    wx.showModal({
      title:postCollected?"收藏?":"取消收藏?",
      content:postCollected?"收藏文章?":"取消收藏文章?",
      success:function(res){
        if(res.confirm){
          wx.setStorageSync("key",postsCollected)
          that.setData({
            isData:postCollected
          })
        }else if (res.cancel) {
          postCollected = !postCollected
          postsCollected[that.data.ownId] = postCollected
          wx.hideToast({

          })
          wx.setStorageSync("key",postsCollected)
          that.setData({
            isData:postCollected
          })
        }
      }
    })
  },
  showToast(postsCollected,postCollected){
     wx.setStorageSync("key",postsCollected)
     this.setData({
       isData:postCollected
     })
    wx.showToast({
      title:postCollected? "收藏成功" : "取消成功",
      duration:1000,
      icon:"success"

    })
  },
  shareCollect(){
    wx.showActionSheet({
      itemList:["分享给微信好友","分享到朋友圈","分享到QQ","分享到空间"],
      itemColor:"#405f80",
      success:function(res){
        //res.cancel：取消按钮/res.tapIndex：数组索引
      }
    })
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