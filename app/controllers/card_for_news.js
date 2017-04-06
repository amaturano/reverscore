var args = $.args;
var lblTitle = $.lbl_title;
var lblDate = $.lbl_date;
var core = require("core");

function openDetails(){
	var newsWin = core.createWindow({
		controllerName : "news_details",
		params : {
			window :{
				title : args.title,
				hidesBarsOnSwipe : true
			},
			link : args.link
		}
	});
	
	(OS_IOS) ? core.IOS_openNewWindow(newsWin) : newsWin.open();
};


(function(){
	if(args.date)
	
	(args.title || (args.title = L("noTitle")));
	(args.date || (args.date = L("noDate"))); 
	
	lblTitle.text = args.title;
	lblDate.text = args.date;
	
})();
