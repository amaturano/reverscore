var evt = {};
evt.events = {};

evt.addEventListener = function(name, handler) {
	if (evt.events.hasOwnProperty(name))
		evt.events[name].push(handler);
	else
		evt.events[name] = [handler];
};

evt.removeEventListener = function(name, handler) {
	if (!evt.events.hasOwnProperty(name))
		return;

	var index = evt.events[name].indexOf(handler);
	if (index != -1)
		evt.events[name].splice(index, 1);
};

evt.fireEvent = function(name, args) {
	args || (args = {});
	if (!evt.events.hasOwnProperty(name))
		return;


	var evs = evt.events[name], l = evs.length;
	for (var i = 0; i < l; i++) {
		evs[i].call(null,args);
	}
};


module.exports = evt; 