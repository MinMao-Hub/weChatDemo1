var app = getApp();

Page({
	data: {
		jokeListInfo:[],
		defaultReqDataQuantity:20,
		currentPage:1
	},
	onLoad: function () {
		// Do some initialize when page load.
		this.requestJokeList();
	},

	onReady: function () {
		// Do something when page ready.
	},

	onShow: function () {
		// Do something when page show.
	},

	onHide: function () {
		// Do something when page hide.
	},

	onUnload: function () {
		// Do something when page close.
	},

	onPullDownRefresh: function () {
		// Do something when pull down
		this.setData({
			defaultReqDataQuantity:20,
			currentPage:1
		});
		this.requestJokeList();
		wx.showNavigationBarLoading();
	},

	onReachBottom: function() {
	    // Do something when page reach bottom.
    	this.requestJokeList();
	},

	requestJokeList: function () {
		var currentDateStr = Date.parse(new Date());   //末尾3位数为0
		// currentDateStr = (new Date()).valueOf();       //末尾3位数为真实时间戳
		// currentDateStr = new Date().getTime();         //末尾3位数为真实时间戳
		var that = this;
		wx.showToast({
			title: '加载中...',
		    icon: 'loading',
		    duration: 1000,
		});

		var currentDate = (currentDateStr/1000).toFixed(0);   //不保留保留小数点  toFixed(0)

		wx.request({
			url:"http://japi.juhe.cn/joke/content/list.from",
			data:{
				'sort':'desc',
				'page':that.data.currentPage,
				'pagesize':that.data.defaultReqDataQuantity,
				'time':'' + currentDate,
				'key':'b97a9a346772e6727b0eecc1d52f03a1'
			},

			header:{
				"Content-Type":"application/json"
			},

			success:function (res) {
				var data = res.data;
				console.log(data);
				wx.hideNavigationBarLoading();
				setTimeout(function(){
				  wx.hideToast();
				},1000);

				if (data.result.data.length < 1) {
					wx.showToast({
						title: '没有更多数据啦！',
						icon: 'success',
						duration: 2000
					});
					return;
				}
				var listInfo = [];
				if (that.data.currentPage == 1) {
					listInfo = data.result.data;
				} else {
					listInfo = that.data.jokeListInfo.concat(data.result.data);
				}

				that.setData({
					jokeListInfo:listInfo,
					currentPage:that.data.currentPage + 1,
				});


			}
		});
	}


});