let theatre = new TheatreComponent();
let clean = new CleanComponent();
let messages = new ChatMessagesComponent();

let url = '';

// event hook does not work :/
setInterval(() => {
	if (url !== window.location.href) {
		console.log('site changed');
		url = window.location.href;
		theatre.url_change();
		clean.url_change();
		messages.url_change();
		if (/mixer.com\/[^/]+\/?$/.test(url)) {
			console.log('url channel');
			theatre.reload();
			clean.reload();
			messages.reload();
		}

	}
}, 100);
