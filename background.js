chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.url) {
			const urlParts = details.url.split('?')[1];
			const requestParams = urlParts.split('&');
			var targetUrl = "Error: couldn't find target URL";
			for (i = 0; i < requestParams.length; i++) {
				const paramValues = requestParams[i].split('=');
				if(paramValues[0] == 'url') {
					targetUrl = decodeURIComponent(paramValues[1]);
				}
			}
			return {
				// cancel: true // simplest method, but does not let us customise the response
				redirectUrl: chrome.extension.getURL('blocked.html?u=' + targetUrl)
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
