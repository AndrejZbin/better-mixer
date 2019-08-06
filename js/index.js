let theatre;
let clean;
let messages;

let interval = setInterval(() => {
	if (OPTIONS.loaded) {
		theatre = new TheatreComponent();
		clean = new CleanComponent();
		messages = new ChatMessagesComponent();
		clearInterval(interval);
	}
}, 100);



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
