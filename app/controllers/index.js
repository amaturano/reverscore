var core = require("core");



(function(){
	
	var newsWin = core.createWindow({
		controllerName : "news",
		params : {
			window :{
				title : L("newstitleWindow"),
				hidesBarsOnSwipe : true
			}
		}
	});
	
	(OS_IOS) ? core.IOS_openNewWindow(newsWin) : newsWin.open();
	
	
})();
