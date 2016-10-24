var app = getApp()

Page({
	data: {
		listData:[],
		loadingHidden:true,
	},
	onLoad: function () {
		// Do some initialize when page load.
		this.requestMovieList()
		this.setData ({
			loadingHidden:false
		}),
		//设置缓存
		wx.setStorage({
     		key:"movieListName",
     		value:''
     	}),

     	wx.setStorage({
     		key:"movie_id",
     		value:''
     	}),
     	wx.setStorage({
     		key:"movie_name",
     		value:''
     	})
	},

	onReady: function () {
		// Do something when page ready.
	},

	onShow: function () {
		// Do something when page show.
		//读取缓存
		wx.getStorage({
			key:"movieListName",
			success: function(res) {
				console.log("---------------------" + res.data)
				//convert object to string
				var navTitle = '' + res.data
				wx.setNavigationBarTitle({
					title:navTitle,
				})
			}
		})
	},

	onHide: function () {
		// Do something when page hide.
	},

	onUnload: function () {
		// Do something when page close.
	},

	onPullDownRefresh: function () {
		// Do something when pull down
		this.requestMovieList()
		this.setData ({
			loadingHidden:false
		})
	},

	requestMovieList: function () {
		var that = this
		//加载数据
  		wx.request({
    		//url 请求地址
	    	url: 'https://api.douban.com/v2/movie/in_theaters',
	    	//发送给服务器的数据
	    	data: {},
	    	header:{
	      	"Content-Type":"application/json"
    		},
	    	success: function(res) {
		    	var data = res.data;
		     	console.log(data)
		     	console.log(data.subjects[0].images['medium'])
		     	//同步缓存
		     	wx.setStorageSync("movieListName",data.title);
		     	//设置导航条标题
		     	wx.setNavigationBarTitle({
					title:data.title,
				})
	     		//想要显示到页面上的数据必须是data上出现的
	     		that.setData({
	        		listData:data.subjects,
	        		loadingHidden:true,
	     		})
	     		//停止当前页面的下拉刷新
	     		wx.stopPullDownRefresh()
	    	}
 		 });
	},

	loadMoreData: function () {
		//加载更多数据 -- 没有加载更多接口   这里不做处理
		this.requestMovieList()
		this.setData ({
			loadingHidden:false
		})
	},

	selectedCell: function (e) {
		var target_id = e.currentTarget.id;
		var movie_id = target_id.split("|")[0];
		var movie_name = target_id.split("|")[1];
		console.log('影片id = ' + movie_id + 'name = ' + movie_name)
		wx.setStorageSync("movie_id",movie_id);
		wx.setStorageSync("movie_name",movie_name);
		wx.navigateTo({url:"../moviedetail/moviedetail"});
	}

})