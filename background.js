chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.url) {
			const urlParts = details.url.split('?')[1];
			const requestParams = urlParts.split('&');
			var targetUrl;
			for (i = 0; i < requestParams.length; i++) {
				const paramValues = requestParams[i].split('=');
				if(paramValues[0] == 'url') {
					targetUrl = paramValues[1];
				}
			}
			return {
				// cancel: true // cancelling is the simplest method, but it does not let us customise the response
				redirectUrl: chrome.extension.getURL('blocked.html?u=' + targetUrl)
			}
		}
		return {
			redirectUrl: chrome.extension.getURL('blocked.html')
		};
	},
	{
		urls: ['*://*.safelinks.protection.outlook.com/*'],
		// types: ['main_frame', 'sub_frame']
	},
	['blocking']
);
