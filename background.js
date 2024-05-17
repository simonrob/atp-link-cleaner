browser = !(typeof globalThis.browser === 'undefined' || 
			Object.getPrototypeOf(globalThis.browser) !== Object.prototype) ? browser : chrome;
browser.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.method === 'GET') {
			if (details.url) {
				const url = new URL(details.url);
				if (url.searchParams.has('url')) {
					const urlComponent = encodeURIComponent(url.searchParams.get('url'));
					return {
						// cancel: true // cancelling is simplest, but it does not let us customise the response
						redirectUrl: browser.runtime.getURL('blocked.html?u=' + urlComponent)
					}
				}
			} else {
				// probably a URL-less request to the root domain - log for investigation if needed
				console.log(details);
			}

		} else if (details.method === 'POST') {
			if (details.requestBody.formData && details.requestBody.formData.Url && details.requestBody.formData.Url.length == 1) {
				const urlComponent = encodeURIComponent(details.requestBody.formData.Url[0]);
				return {
					redirectUrl: browser.runtime.getURL('blocked.html?u=' + urlComponent)
				}
			} else {
				// probably a POST-less request to the root domain (*.safelinks.protection.outlook.com/GetUrlReputation)
				// - log for investigation if needed
				console.log(details);
			}
		}

		return {
			redirectUrl: browser.runtime.getURL('blocked.html')
		};
	},
	{
		urls: [
			'*://*.safelinks.protection.outlook.com/*',
			'*://outlook.office.com/mail/safelink.html*'
		],
		// types: ['main_frame', 'sub_frame']

	},
	['blocking', 'requestBody']
);
