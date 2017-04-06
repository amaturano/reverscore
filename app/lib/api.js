var nodeApi = (function(){
	var log = require("logs");
	var network = require("NETWORK");
	var TAG = "[API.js] : ";
	var CODES = {
		OK : 202,
		SUCCESS : 201,
		DATA_EMPTY : 404
	};
	
	
	function getNews(_callback){
		log.info(TAG, "getting news from WS");
		network.get({
			page : "api.json?rss_url=https%3A%2F%2Fnews.ycombinator.com%2Frss",
			callback : function(e){
				_callback || (_callback = function(){});
				
				_callback(e);
				
			},
			headers : {
				Authorization : ""
			}
		});	
	}
	
	return {
		getNews : getNews,
		CODES : CODES
	};
})();

module.exports = nodeApi;
