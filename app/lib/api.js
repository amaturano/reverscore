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
	
	/*function signUpUser(_info, _callback){
		log.info(TAG, "Sign In New User");
		
		network.post({
			page : "/user",
			data : _info,
			callback : function(e){
				_callback || _callback(e);
				_callback = null;
			},
			headers : {
				"Content-Type" : "application/json"
			}
		});
		
	};
	
	function signIn(_info, _callback){
		
		log.info(TAG, " Sign In User ...");
		
		network.post({
			page : "/token",
			data : _info,
			callback : _callback,
			headers : {
				"Content-Type" : "application/json"
			}
		});
		
		
	}
	
	function getMyShops(_callback){
		log.info(TAG, "get my Shops ...");
		
		log.info(TAG, "/user/" + user._id + "/admin/shop");
		log.info(TAG, user._headers);
		
		network.get({
			page : "/user/" + user._id + "/admin/shop",
			callback : function(e){
				_callback || (_callback = function(){});
				
				_callback(e);
				
			},
			headers : {
				Authorization : user._headers
			}
		});
	}
	
	function createNewShop(_info ,_callback){
		log.info(TAG, "creating new shop ...");
		_callback || (_callback = function(e){});
		
		network.post({
			page : "/user/" + user._id + "/admin/shop",
			data : _info,
			callback : _callback,
			headers : {
				Authorization : user._headers,
				"Content-Type" : "application/json"
			}
		});
		
	}*/

	
	return {
		getNews : getNews,
		CODES : CODES
	};
})();

module.exports = nodeApi;
