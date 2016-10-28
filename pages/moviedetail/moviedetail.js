var app = getApp();

Page({
	data: {
		movieInfo:{},
		loadingHidden:true,
		actionSheetHidden:true,
		shareItem:["微信朋友圈","微信好友"],
	},
	onLoad: function () {
		// Do some initialize when page load.
		this.requestMovieInfo();
	},

	onReady: function () {
		// Do something when page ready.
		// wx.getStorage({
		// 	key:"movie_data",
		// 	success: function(res) {
		// 		//convert object to string
		// 		var navTitle = '' + JSON.parse(res.data).movie_name;
		// 		wx.setNavigationBarTitle({
		// 			title:navTitle,
		// 		});
		// 	}
		// });

		wx.setNavigationBarTitle({
			title:JSON.parse(app.globalData.movie_data).movie_name,
		});


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
		this.requestMovieInfo();
		this.setData ({
			loadingHidden:false
		});
	},

	requestMovieInfo: function () {
		var that = this;
		// wx.getStorage({
		// 	key:"movie_data",
		// 	success: function(res) {
		// 		console.log("---------------------" + res.data + "----------------");
		// 		//convert object to string
		// 	}
		// });

		var movieId = '' + JSON.parse(app.globalData.movie_data).movie_id;
		that.setData ({
			loadingHidden:false
		});
		wx.request({
    		//url 请求地址
	    	url: 'https://api.douban.com/v2/movie/subject/' + movieId,
	    	//发送给服务器的数据
	    	data: {},
	    	header:{
	      	"Content-Type":"application/json"
    		},
	    	success: function(res) {
		    	var data = res.data;
		     	console.log(data);
	     		//想要显示到页面上的数据必须是data上出现的
	     		that.setData({
	        		movieInfo:data,
	        		loadingHidden:true,
	     		});
	     		//停止当前页面的下拉刷新
	     		wx.stopPullDownRefresh();
	    	}
			});


	},

	director_tap: function (e) {
		console.log(e);

		app.globalData.castId = e.currentTarget.id;
		wx.navigateTo({url:"../castdetail/castdetail"});
	},

	cast_tap: function (e) {
		console.log(e);

		app.globalData.castId = e.currentTarget.id;
		wx.navigateTo({url:"../castdetail/castdetail"});
	},

	shareBtnClicked: function (e) {
		// console.log(e);
		this.setData({
			actionSheetHidden:false,
 		});
	},

	actionSheetChange: function () {
		this.setData({
			actionSheetHidden:true,
 		});
	},

	bindItemTap: function (e) {
		console.log(e);
		this.setData({
			actionSheetHidden:true,
 		});
	},

	movieImageTaped: function (e) {
		var url = e.currentTarget.dataset.url;
		wx.previewImage({
			current: url, // 当前显示图片的http链接
			urls: [url,url], // 需要预览的图片http链接列表
			success: function(e) {
				console.log("图片预览OK");
			}
		});
	}

});
