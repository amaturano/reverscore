var args = $.args;
var webView = $.wv_details;
	
$.androidBack = function(){
	$.window.close();
};

(function(){
	
	(args.link || (args.link = "https//coffeebit.us"));
	webView.setUrl(args.link);
	
})();
