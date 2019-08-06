class TheatreComponent extends Component {
	constructor() {
		super('theatre');

		this.in_theatre = false;
		let self = this;

		if (OPTIONS.opt('resize_top_panel'))
			this.el('sub_popup').on_actions({
				'theatre-on': function() {
					this.obj && this.obj.css('display', 'none');
				},
				'theatre-off': function() {
					this.obj && this.obj.css('display', 'initial');
				},
			});

		this.el('stage').on_actions({
			'theatre-on': function() {
				this.obj.addClass('custom-theatre');
				this.saved_style = this.obj.attr('style');
				if (this.obj.hasClass('aspect-16-9')) {
					this.obj.attr('style', '');
				}
				else {
					this.obj.attr('style', this.saved_style_theatre || '');
				}
			},
			'theatre-off': function() {
				this.obj.removeClass('custom-theatre');
				if (!this.obj.hasClass('aspect-16-9')) {
					this.saved_style_theatre = this.obj.attr('style');
				}
				this.obj.attr('style', this.saved_style || '');
			},
		});

		if (OPTIONS.opt('resize_top_panel'))
			this.el('header').on_actions({
				'theatre-on': function() {
					this.obj.addClass('custom-header');
					this.obj.css({
						'width': EM.el('stage').obj.css('width'),
						'position': 'fixed',
					});
				},
				'theatre-off': function() {
					this.obj.removeClass('custom-header');
					this.obj.css({
						'width': '100%',
						'position': 'sticky',
					});
				},
				'url-changed': function() {
					this.obj.removeClass('custom-header');
					this.obj.css({
						'width': '100%',
					});
					this.obj.find('.theatre-button').remove();
				}
			});

		if (OPTIONS.opt('resize_top_panel'))
			this.el('chat').on_actions({
				'loaded': function() {
					if (self.in_theatre) this.action('theatre-on');
					else this.action('theatre-off');
				},
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

		if (OPTIONS.opt('resize_top_panel'))
			this.el('channel_page').on_actions({
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

		if (OPTIONS.opt('resize_top_panel'))
			this.el('profile_header').on_actions({
				'theatre-on': function() {
					this.obj.css('position', 'relative');
				},
				'theatre-off': function() {
					this.obj.css('position', 'sticky');
				}
			});

		this.el('chat_resizer').on_actions({
			'theatre-on': function() {
				this.obj.css('display', 'none');
			},
			'theatre-off': function() {
				this.obj.css('display', 'initial');
			}
		});

		if (OPTIONS.opt('theatre_bottom'))
			this.el('theatre_button_bound').on_actions({
				'url-changed-channel': function () {
					this.obj_promise()
						.then(obj => {
							obj.before(self.theatre_button())
						});
				}
			});

		if (OPTIONS.opt('theatre_top'))
			this.el('language_selector').on_actions({
				'url-changed-channel': function () {
					this.obj_promise()
						.then(obj => {
							self.el('header').obj.find('.theatre-button').remove();
							obj.before(self.theatre_button("theatre-button-small"))
						});
				},
				'url-changed': function() {
					self.el('header').obj.find('.theatre-button').remove();
				}
			});

		$(document).on('keypress', e => {
			if ([84, 116].includes(e.which) && !['TEXTAREA', 'TEXTFIELD', 'INPUT'].includes(e.target.nodeName)) {
				this.toggle_theatre();
			}
		});

		if (OPTIONS.opt('theatre_automatic')) {
		    this.toggle_theatre();
        }
	}

	theatre_button(classes='') {
		let $threatre_button = $(`<input type="button" class="theatre-button ${classes}" value="📺" title="Theatre Mode"/>`);
		$threatre_button.click(this.toggle_theatre.bind(this));
		return $threatre_button;
	}

	toggle_theatre() {
		console.log('theatre mode changed');
		this.in_theatre = !this.in_theatre;
		if (this.in_theatre) this.action('theatre-on');
		else this.action('theatre-off')
	}
}




