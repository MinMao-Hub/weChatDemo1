var app = getApp();

var castDetail = {
	data: {
		castInfo:{},
		loadingHidden:true,
	},

	onLoad: function () {
		this.setData ({
			loadingHidden:false
		});
		this.requestCastInfo();
	},

	onReady: function () {

	},

	onShow: function () {

	},

	onHide: function () {

	},

	onUnload: function () {

	},

	onPullDownRefresh: function () {

	},

	requestCastInfo: function () {

		var that = this;
		var castID = app.globalData.castId;
		console.log('演员ID：' + castID);
		wx.request({
			url: 'https://api.douban.com/v2/movie/celebrity/' + castID,
			data: {},
			header:{
				"Content-Type":"application/json"
			},
			success: function(res) {
				var data = res.data;
		     	console.log(data);
		     	that.setData({
		     		castInfo:data,
		     		loadingHidden:true
		     	});

		     	wx.setNavigationBarTitle({
		     		title:data.name
		     	});
			}
		});
	},

	selectedCell: function async (e) {
		var target_id = e.currentTarget.id;
		var movie_id = target_id.split("|")[0];
		var movie_name = target_id.split("|")[1];
		console.log('影片id = ' + movie_id + 'name = ' + movie_name);

		var data  = JSON.stringify({
			movie_id: movie_id,
			movie_name: movie_name
		});
		app.globalData.movie_data = data;

		wx.navigateTo({url:"../moviedetail/moviedetail"});
		
		// wx.setStorageSync("movie_id",movie_id);
		// wx.setStorageSync("movie_name",movie_name);
		// wx.navigateTo({url:"../moviedetail/moviedetail"});
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
};

Page(castDetail);
