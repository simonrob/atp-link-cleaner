chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.url) {
			var urlParts = details.url.split('?')[1];
			var requestParams = urlParts.split('&');
			var targetUrl = "Error:  couldn't find target URL.";
			for (i = 0; i < requestParams.length; i++) {
				paramValues = requestParams[i].split('=');
				if(paramValues[0] == 'url') {
					targetUrl = decodeURIComponent(paramValues[1]);
				}
			}
			if (targetUrl && confirm('Navigate to ' + targetUrl + '?')) {
				console.log('Redirecting to ' + targetUrl);
				return {
					redirectUrl : targetUrl
				};
			} else {
				return {
					cancel: true
				}
			}
		}

		return {};
	},
	{
		urls: ['*://*.safelinks.protection.outlook.com/*'],
		// types: ['main_frame', 'sub_frame']
	},
	['blocking']
);
