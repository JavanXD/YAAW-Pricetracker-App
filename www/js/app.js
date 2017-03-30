/* vibrate phone */
		function vibration(time) {
		   time = time || 80;
		   navigator.vibrate(time);
		}
		
		var inAppBrowserRef;
		openUrl = "https://www.yaaw.de/?utm_source=phonegapapp";		
		options = "location=no,hidden=yes,zoom=no,clearsessioncache=no,clearcache=no"; // start in hidden mode
		
		function onDeviceReady() {
			
			window.open = cordova.InAppBrowser.open;
			
			inAppBrowserRef = cordova.InAppBrowser.open(openUrl, '_blank', options);
			
			inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
			inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);
			inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);
			inAppBrowserRef.addEventListener('exit', loadExitCallBack);
			
			window.plugins.webintent.getExtra(window.plugins.webintent.EXTRA_TEXT,
				function (url) {
					if(url !== "" && url != null) {
						// url is the value of EXTRA_TEXT
						//alert(url);
						openUrl = 'https://www.yaaw.de/list?url=' + encodeURIComponent(url) + '&utm_source=phonegapapp';
						window.open(openUrl, '_blank', options);
						loadStopCallBack();
					}
				}, function () { 
					// There was no extra supplied. 					
				}
			);
			
			window.plugins.webintent.onNewIntent(function(url) {
				if(url !== "" && url != null) {
					//alert(url);
					openUrl = 'https://www.yaaw.de/list?url=' + encodeURIComponent(url) + '&utm_source=phonegapapp';
					window.open(openUrl, '_blank', options);
					loadStopCallBack();
				}
			});

		}
		
        document.addEventListener("deviceready", onDeviceReady, false);
		
		function loadStartCallBack(){
			
			inAppBrowserRef.hide(); // hide browser for showing spinner
			$('.loader').show();
		}
		
		function loadStopCallBack(){
			inAppBrowserRef.show(); // show browser after loading page
			$('.loader').hide(); // hide loading spinner after loading page
		}
		
		function loadErrorCallBack(params){

			var scriptErrorMesssage =
			   "alert('Sorry we cannot open that page. Message from the server is : "
			   + params.message + "');"
			   
			inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);
			
			inAppBrowserRef.close();
			
			inAppBrowserRef = undefined;

		}
		
		function executeScriptCallBack(params) { // error while executing the script
		
			if (params[0] == null) {
			
			}
		}
		
		function loadExitCallBack(){ 
			vibration(140);	// haptic feedback
			navigator.app.exitApp(); // close app
		}
		
		// event for pressing the back button
		document.addEventListener("backbutton", onBackKeyDown, false);
		function onBackKeyDown(event) {
			// your code for handling back button comes here
			vibration(100);
		}
		
		
		