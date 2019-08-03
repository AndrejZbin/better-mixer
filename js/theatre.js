class TheatreComponent extends Component {
	constructor() {
		const stage = new WebElement('.stage', {
			'theatre-on': function() {
				this.obj.addClass('custom-theatre');
				this.saved_style = this.obj.attr('style');
				this.obj.attr('style', this.saved_style_theatre || '');
			},
			'theatre-off': function() {
				this.obj.removeClass('custom-theatre');
				this.saved_style_theatre = this.obj.attr('style');
				this.obj.attr('style', this.saved_style || '');
			},
		});

		const header = new WebElement('b-desktop-header', {
			'theatre-on': function() {
				this.obj.addClass('custom-header');
				this.obj.css({
					'width': `calc(100% - ${chat.obj.css( "width" )} - 17px)`,
				});
			},
			'theatre-off': function() {
				this.obj.removeClass('custom-header');
				this.obj.css({
					'width': '100%',
				});
			},
			'url-change': function() {
				this.obj.removeClass('custom-header');
				this.obj.css({
					'width': '100%',
				});
				$('.theatre-button').remove();
			}
		});

		const chat = new WebElement('aside.chat',{
			'theatre-on': function() {
				// disconnected when fullscreen
				let obj = this.obj.get(0);
				if (!obj || !obj.isConnected) {
					this.obj = $(this.query);
				}
				this.obj.css('top', '0');
			},
			'theatre-off': function() {
				this.obj.css('top', '60px');
			}
		});

		const channel_page = new WebElement('div.channel-page',{
			'theatre-on': function() {
				this.obj.css({
					'height': '100vh',
					'max-height': '100vh',
				});
			},
			'theatre-off': function() {
				this.obj.css({
					'height': 'calc(100vh - 60px)',
					'max-height': 'calc(100vh - 60px)',
				});
			}
		});

		const profile_header = new WebElement('div.layout-row.layout-align-space-between-start.profile-header', {
			'theatre-on': function() {
				this.obj.css('position', 'relative');
			},
			'theatre-off': function() {
				this.obj.css('position', 'sticky');
			}
		});

		const chat_resizer = new WebElement('b-channel-chat-resizer', {
			'theatre-on': function() {
				this.obj.css('display', 'none');
			},
			'theatre-off': function() {
				this.obj.css('display', 'initial');
			}
		});

		const theatre_button_bound = new WebElement('b-title-progression-host');
		const language_selector = new WebElement('b-language-selector');

		super('theatre', [stage, header, chat, channel_page, profile_header, chat_resizer, theatre_button_bound, language_selector]);

		this.theatre_button_bound = theatre_button_bound;
		this.language_selector = language_selector;
		this.in_theatre = false;
	}

	reload() {
		super.reload();
		this.in_theatre = false;
	}

	get_button(classes='') {
		let $threatre_button = $(`<input type="button" class="theatre-button ${classes}" value="📺" title="Theatre Mode"/>`);
		$threatre_button.click(this.on_button_click.bind(this));
		return $threatre_button;
	}

	on_button_click() {
		console.log('theatre mode changed');
		this.in_theatre = !this.in_theatre;
		if (this.in_theatre) this.action('theatre-on');
		else this.action('theatre-off')
	}

	main() {
		super.main();
		$('.theatre-button').remove();

		$(document).on('keypress', e => {
			if ([84, 116].includes(e.which)) {
				this.on_button_click();
			}
		});

		this.language_selector.obj.before(this.get_button("theatre-button-small"));
		this.theatre_button_bound.obj.before(this.get_button());
	}
}




