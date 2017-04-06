var NETWORK = (function(){
	var domain = Alloy.CFG.domain;
	var _requesting = false;
	var _reqArray = [];
	var events = require("events");
	var log = require("logs");
	var TAG = "[network.js] : ";
	
	var OVER_MOBILE_NETWORK = 60000;
	var ON_NETWORK_ERROR = 300000;
	var REQUEST_DELAY = 5000;
	var REQUEST_TIMEOUT = 1000 * 20;
	var retryTime = 10000;
	
	function check() {
		if(!_requesting && _reqArray.length > 0) {
			var request = _reqArray.pop();
			createRequestBody(request.e, request.method);
		}
	}
	
	function post(e) {
		log.info(TAG," method POST reciving data...");
		_reqArray.push({
			method : "POST",
			e : e
		});
	}
	
	function _get(e){
		_reqArray.push({
			method : "GET",
			e : e
		});
	}
	
	function put(e){
		_reqArray.push({
			method : "PUT",
			e : e
		});
	}
	
	function sendDelete(e){
		_reqArray.push({
			method : "DELETE",
			e : e
		});
	}
	
	function createRequestBody(_params, method) {
		log.info(TAG, "createRequestBody method = " + method);
		domain = Alloy.CFG.domain;
		var urlDomain = _params.domain || domain;
		
		_requesting = true;
		
		var url = urlDomain + _params.page;
		var client = Ti.Network.createHTTPClient({
			onload : function(e){
				onSuccess(this, _params.page, method, _params.data, _params.callback);
				client = null;
			
			},
			onerror : function(e){
				//console.log(" code : " + e.code + "\n status : " + e.status + "\n data : " + e.data + "\n message : " + e.message + "\n Error : " + e.error);
				console.log("::::: Response :::::::\n" + JSON.stringify(e));
				onError(e, _params.page, method, _params.data, _params.callback);
				client = null;
			}, 
			
			timeout : REQUEST_TIMEOUT
		});
		
		if(_params.progress) {
			client.onsendstream = function(e) {
				_params.progress(e);
			};
		}

		
		client.open(method, url);
		_.each(_params.headers, function(val, name) {
			log.info(TAG, "setRequestHeader val = " + val + " name = " + name);
			client.setRequestHeader(name, val);
		});
		
		//log.info(TAG, "HTTP PARAMS : "+ url + "\n" + JSON.stringify(_params.data) + "\n method : " + method);
		
		var dta = JSON.stringify(_params.data);
		client.send(dta);
				
	}
		
		
	function onSuccess(e, page, method, params, callback, showProgress, retryRequest) {
		NETWORK.retryTime = 10000;
		log.info(TAG, "HTTP Response from page [" + page + "]:" + e.responseText);
		var json = {};
		
		if(e.responseText) {
			try {
				json = JSON.parse(e.responseText);
				json.headers = {
					"Location" : e.getResponseHeader("Location"),
					"Authorization" : e.getResponseHeader("Authorization")
				};
			}catch(ex){
				json.message = ex.message;
			}
		}
		
		if(e.responseData){
			json.dataBlob = e.responseData;
		}
		
		json.ok = true;
		callback && callback({
			json : json
		});	
		page = null;
		_.each(params, function(node) {
			node = null;
		});
		params = null;
		_requesting = false;
	}
		
	function onError(e, page, method, params, callback, showProgress, retryRequest) {
		log.info(TAG, "HTTP error on " + page + " please try again. \n" + e.error +"\n error = " + JSON.stringify(e));
		
		e.ok = false;
		e.status = "failed";
		if(e.code == 401) {
			events.fireEvent("tokenExpired");
		}
		callback && callback({
			json : e
		});
		page = null;
		_.each(params, function(node) {
			node = null;
		});
		params = null;
		_requesting = false;
	}
		
	setInterval(check, 100);
	
	
	return {
		"get" : _get,
		post : post,
		put : put,
		"delete" : sendDelete
	};
	
})();

module.exports = NETWORK;
