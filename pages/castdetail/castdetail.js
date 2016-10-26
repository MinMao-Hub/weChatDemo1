var app = getApp()

var castDetail = {
	data: {
		castInfo:{},
		loadingHidden:true,
	},

	onLoad: function () {
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
		     	console.log(data)
			}
		})
	}
}

Page(castDetail)
