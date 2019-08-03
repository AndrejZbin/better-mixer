let theatre = new TheatreComponent();

let url = '';

// event hook does not work :/
setInterval(() => {
	if (url !== window.location.href) {
		console.log('site changed');
		url = window.location.href;
		theatre.url_change();
		if (/mixer.com\/[^/]+\/?$/.test(url)) {
			console.log('url channel');
			theatre.reload();
		}

	}
}, 100);
