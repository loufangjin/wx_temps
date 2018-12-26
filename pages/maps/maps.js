const myaudio = wx.createInnerAudioContext(); 
Page({
	/**
	 * 页面的初始数据
	 */
	data:{
		latitude: 0,//纬度 
	  	longitude: 0,//经度 
	  	speed: 0,//速度 
	  	accuracy: 16,//位置精准度 
	  	markers: [], //标记点
	  	covers: [], //覆盖物
	  	audioArr: [
	  	  {
	  	    id: '000',
	  	    src: 'http://mp3.djwma.com/mp3/爆袭全站欢快节奏感觉那是杠杠滴.mp3',
	  	    time: '30s',
	  	    bl: false
	  	  },
	  	  {
	  	    id: '001',
	  	    src: 'http://mp3.djwma.com/mp3/好听的欧美男声 网络流行.mp3',
	  	    time: '50s',
	  	    bl: false
	  	  },
	  	]
	},
	//音频播放  
	audioPlay: function (e) {
	  var that = this,
	    id = e.currentTarget.dataset.id,
	    key = e.currentTarget.dataset.key,
	    audioArr = that.data.audioArr,
	    vidSrc = audioArr[key].src;
	 	myaudio.src = vidSrc;
	  	myaudio.autoplay = true;

	  //切换显示状态:初始让所有状态值变成false
		for (var i = 0; i < audioArr.length; i++) {
		   audioArr[i].bl = false;
		}
	 //点击的时候让当前这个变成true
	  audioArr[key].bl = true;

	  //开始监听
	  myaudio.onPlay(() => {
	    that.setData({
	      audioArr: audioArr
	    })
	  })

	  //结束监听
	  myaudio.onEnded(() => {
	    audioArr[key].bl = false;
	    that.setData({
	      audioArr: audioArr,
	    })
	  })

	},

	// 音频停止
	audioStop: function (e) {
	  var that = this,
	    key = e.currentTarget.dataset.key,
	    audioArr = that.data.audioArr;
	  //切换显示状态
	  for (var i = 0; i < audioArr.length; i++) {
	    audioArr[i].bl = false;
	  }
	  audioArr[key].bl = false;

	  myaudio.stop();
	  //停止监听
	  myaudio.onStop(() => {
	    audioArr[key].bl = false;
	    that.setData({
	      audioArr: audioArr,
	    })
	    console.log(1)
	  })
	  //结束监听
	  myaudio.onEnded(() => {
	    audioArr[key].bl = false;
	    that.setData({
	      audioArr: audioArr,
	    })
	    console.log(2)
	  })
	}, 
	/**
	 * 生命周期函数--监听页面加载,初始化；发请求
	 */
	onLoad: function (options) {
		
	},
	getlocation: function () {
	 	var that = this 
		wx.getLocation({ //获取当前位置API
		   type: 'gcj02', //用gch02返回的坐标可以直接打开地图
		   success: function (res) { 
		   /* var latitude = res.latitude 
		    var longitude = res.longitude 
		    var speed = res.speed 
		    var accuracy = res.accuracy*/
		    var markers = [{ 
	     	   latitude: res.latitude, 
	     	   longitude: res.longitude, 
	     	   name: '贵阳观山湖区', 
	     	   desc: '我的位置'
	     	}] 
	     	var covers = [{ 
	     	   latitude: res.latitude, 
	     	   longitude: res.longitude, 
	     	   iconPath: '../../images/2.png', 
	     	   rotate: 0 
	     	}] 
	     	that.setData({ 
	     	   longitude: res.longitude, 
	     	   latitude: res.latitude, 
	     	   markers: markers, 
	     	   covers: covers, 
	     	})
		    /*console.log("latitude:" + res.latitude) 
		    console.log("longitude:" + res.longitude) 
		    console.log("speed:" + res.speed) 
		    console.log("accuracy:" + res.accuracy) */
		    wx.openLocation({ //查看位置
		     latitude: res.latitude, 
		     longitude: res.longitude, 
		     scale: 28 
		    }) 
		   },
		   fail:function(res){
		   	console.log('fali',res)
		   },
		   complete:function(res){
		   	console.log('com',res)
		   } 
		  }) 
	  /*var markers = [{ 
	   latitude: 31.23, 
	   longitude: 121.47, 
	   name: '贵阳观山湖区', 
	   desc: '我的位置'
	  }] 
	  var covers = [{ 
	   latitude: 31.23, 
	   longitude: 121.47, 
	   iconPath: '../../images/2.png', 
	   rotate: 0 
	  }] 
	  this.setData({ 
	   longitude: 121.47, 
	   latitude: 31.23, 
	   markers: markers, 
	   covers: covers, 
	  }) */
	 },

	/**
	 * 生命周期函数--监听页面初始渲染完成
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
	 * 用户点击右上角转发
	 */
	onShareAppMessage: function () {

	},

	/**
	 * 页面滚动触发事件的处理函数
	 */
	onPageScroll: function () {

	},

	/**
	 * 当前是 tab 页时，点击 tab 时触发
	 */
	onTabItemTap: function(item) {

	},
})