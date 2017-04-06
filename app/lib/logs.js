var logs = (function(){
	var logsEnabled = Alloy.CFG.logsEnabled;
	
	function info(tag, message){
		logsEnabled && console.log(tag,message);
	}
	
	function warn(tag, message){
		logsEnabled && console.warn(tag,message);
	}
	
	function error(tag, message){
		logsEnabled && console.error(tag,message);
	}
	
	return {
		info : info,
		warn : warn,
		error : error
	};
	
})();

module.exports = logs;


