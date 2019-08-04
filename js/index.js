var BROWSER;
if (typeof browser !== "undefined") BROWSER = browser;
else if (typeof chrome !== "undefined") BROWSER = chrome;

let theatre = new TheatreComponent();
let clean = new CleanComponent();
let messages = new ChatMessagesComponent();

let url = '';

// event hook does not work :/
setInterval(() => {
	if (url !== window.location.href) {
		console.log('site changed');
		url = window.location.href;
		if (/mixer.com\/[^/]+\/?$/.test(url)) {
			console.log('url channel');
			theatre.url_change('channel');
			clean.url_change('channel');
			messages.url_change('channel');

		}
		else {
			theatre.url_change();
			clean.url_change();
			messages.url_change();
		}

	}
}, 100);
