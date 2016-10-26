var app = getApp();

Page({
	data: {
		title: "这是更多",
	},
	onLoad: function () {
		// Do some initialize when page load.
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
	},

	viewTap: function () {
		this.setData ({
			text: "更多页面被点击啦"
		});
	}


});