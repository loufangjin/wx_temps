var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
	/**
	 * 页面的初始数据
	 */
	data:{
		tabs: ["选项一", "选项二", "选项三","选项四","选项五","选项六","选项七","选项吧","选项九"],
		activeIndex: 1,
		sliderOffset: 0,
		sliderLeft: 0,
		inputShowed: false,
		inputVal: "",
		files: [],
		list:[],
		lastY:0, //滑动开始的Y坐标
		text:"没有滑动",
		currentGesture: 0, //标识手势
		top:0,
	},
	startDistance(e){
		this.data.lastY = event.touches[0].pageY
	},
	endDistance(e){
		this.data.currentGesture = 0;
		this.setData({
		   text: "没有滑动",
		});
	},
	moveDistance(e){
		var currentY = e.changedTouches[0].pageY;
		var ty = currentY - this.data.lastY
		if(ty<0){
			console.log("向上滑动")
		}else if(ty>0){
			console.log("向下滑动")
		}
	},
	scrollTop(e){
		
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		wx.getSystemInfo({
		    success: function(res) {
		        that.setData({
		            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
		            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
		        });
		    }
		});
	},
	tabClick: function (e) {
	    this.setData({
	        sliderOffset: e.currentTarget.offsetLeft,
	        activeIndex: e.currentTarget.id
	    });
	},
	showInput: function () {
	    this.setData({
	        inputShowed: true
	    });
	},
	hideInput: function () {
	    this.setData({
	        inputVal: "",
	        inputShowed: false
	    });
	},
	clearInput: function () {
	    this.setData({
	        inputVal: ""
	    });
	},
	inputTyping: function (e) {
	    this.setData({
	        inputVal: e.detail.value
	    });
	},
	chooseImage: function (e) {
	    var that = this;
	    wx.chooseImage({
	        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	        success: function (res) {
	            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
	            that.setData({
	                files: that.data.files.concat(res.tempFilePaths)
	            });
	        }
	    })
	},
	previewImage: function(e){
	    wx.previewImage({
	        current: e.currentTarget.id, // 当前显示图片的http链接
	        urls: this.data.files // 需要预览的图片http链接列表
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