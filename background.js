chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.url) {
			const url = new URL(details.url);
			if (url.searchParams.has('url')) {
				const urlComponent = encodeURIComponent(url.searchParams.get('url'));
				return {
					// cancel: true // cancelling is the simplest method, but it does not let us customise the response
					redirectUrl: chrome.extension.getURL('blocked.html?u=' + urlComponent)
				}
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
