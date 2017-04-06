var args = $.args;
var api = require("api");
var btnTryAgain = $.btn_tryAgain;
var parent = $.mainScrll;

function tryAgain(){
	api.getNews(function(e){
		//alert(JSON.stringify(e));
		if(e.json.status == "ok"){
			btnTryAgain.visible = false;
			//$.news.remove(btnTryAgain);
			//alert(JSON.stringify(e));
			var data = e.json.items;
			
			for(var i in data){
				
				var view = Alloy.createController("card_for_news", {
					title : data[i].title,
					date : data[i].pubDate,
					link : data[i].link
				}).getView();
				
				parent.add(view);
			}
			
		}
		else{
			alert(L("somethingWrong"));
			btnTryAgain.visible = true;
		}
	});
};

(function(){
	
	tryAgain();
	
})();
