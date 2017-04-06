var core = (function(){
	var log = require("logs");
	var TAG = "[core.js] : ";
	var IOS_WINDOW_NAVIGATION = null;
	var DEFAULT_BACKGROUNDCOLOR = "#ECF0F1";
	
	function createWindow(e){
		
		var name = e.controllerName;
		var params = e.params;
		
		log.info(TAG, "Creating new window");
		params || (params = {});
		params.window || (params.window = {});
		params.window.title || (params.window.title = "no title");
		
		//params.window.fullscreen = (OS_ANDROID) ? false : true;
		params.window.windowSoftInputMode = (OS_ANDROID) ? Ti.UI.Android.SOFT_INPUT_ADJUST_PAN : null;
		params.window.backgroundColor || (params.window.backgroundColor = DEFAULT_BACKGROUNDCOLOR);
		//params.window.navBarHidden || (params.window.navBarHidden = true);
		
		var currentController = Alloy.createController(name, params);
		currentController.window = Ti.UI.createWindow(params.window);
		currentController.window.add(currentController.getView());
		
		!params.window.orientationModes && (currentController.window.orientationModes = [Titanium.UI.PORTRAIT]);
		

		if(currentController.postOpen){
        	currentController.window.addEventListener("open", function postOpen(e){
	        	currentController.window.removeEventListener("open", postOpen);
	        	currentController.postOpen();
	        });
        }

        if(currentController.androidBack){
        	currentController.window.addEventListener('android:back', function postOpen(e){
	        	currentController.window.removeEventListener("androidback", postOpen);
	        	currentController.androidBack(e);
	        });
        }

        if(currentController.cleanUp){
        	currentController.window.addEventListener("close", function cleanUp(e){
        		
	        	currentController.window.removeEventListener("close", cleanUp);
	        	currentController.cleanUp(e);
	        	currentController = null;
	        });
        }
        
        return currentController.window;
		
	};
	
	
	function IOS_openNewWindow(_windowName){
		if(IOS_WINDOW_NAVIGATION){
			IOS_WINDOW_NAVIGATION.openWindow(_windowName);
		}
		else{
			IOS_WINDOW_NAVIGATION = Ti.UI.iOS.createNavigationWindow({
				window : _windowName
			});
			IOS_WINDOW_NAVIGATION.open();
		}
	}
	
	
	return {
		createWindow : createWindow,
		IOS_openNewWindow : IOS_openNewWindow
	};
	
})();

module.exports = core;
