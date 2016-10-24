var app = getApp()

Page({
	data: {
		movieInfo:{},
		loadingHidden:true,
	},
	onLoad: function () {
		// Do some initialize when page load.
		this.requestMovieInfo()
	},

	onReady: function () {
		// Do something when page ready.
		wx.getStorage({
			key:"movie_name",
			success: function(res) {
				console.log("---------------------" + res.data + "----------------")
				//convert object to string
				var navTitle = '' + res.data
				wx.setNavigationBarTitle({
					title:navTitle,
				})
			}
		})
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
		this.requestMovieInfo()
		this.setData ({
			loadingHidden:false
		})
	},

	requestMovieInfo: function () {
		var that = this;
		wx.getStorage({
			key:"movie_id",
			success: function(res) {
				console.log("---------------------" + res.data + "----------------")
				//convert object to string
				var movieId = '' + res.data
				that.setData ({
					loadingHidden:false
				}),
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
				     	console.log(data)
			     		//想要显示到页面上的数据必须是data上出现的
			     		that.setData({
			        		movieInfo:data,
			        		loadingHidden:true,
			     		})
			     		//停止当前页面的下拉刷新
			     		wx.stopPullDownRefresh()
			    	}
 				});
			}
		})
	}

})
