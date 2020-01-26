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

		let timeout = null;
		this.el('stage').on_actions({
            'url-changed-channel': function() {
                if (OPTIONS.opt('theatre_automatic')) {
                    timeout = setTimeout(() => {
                    	self.toggle_theatre(true);
                    	timeout = null;
					}, 2200);
                }
            },
			'url-changes': function () {
				if (timeout !== null) clearTimeout(timeout)
			},
			'theatre-on': function() {
				this.obj.addClass('custom-theatre');
				if (OPTIONS.opt('black_theatre')) this.obj.addClass('black-background');
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
				this.obj.removeClass('black-background');
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
					this.action('theatre-off');
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

		this.el('theatre_button_bound').on_actions({
			'url-changed-channel': function () {
				this.obj_promise()
					.then(obj => {
						obj.parent().find('.theatre-button').remove();
						obj.before(self.theatre_button($(obj)));
					});
			}
		});

		if (OPTIONS.opt('keyboard_control'))
            $(document).keydown((e) => {
                if ([84, 116].includes(e.which) && !['TEXTAREA', 'TEXTFIELD'].includes(e.target.nodeName)) {
                    this.toggle_theatre();
                }
            });
	}

	theatre_button(copyObj) {
		let $threatre_button = $(`
			<span class="${copyObj.attr('class')}">
				<button type="button" class="theatre-button ${copyObj.find('button').attr('class')}">
					<span class="${copyObj.find('span').attr('class')}">Theatre Mode</span>
					<i class="${copyObj.find('i').attr('class')}">settings_overscan</i>
				</button>
			</span>`);
		$threatre_button.click(this.toggle_theatre.bind(this));
		return $threatre_button;
	}

	toggle_theatre(state) {
		if (state === true) {
			this.in_theatre = true;
		}
		else if (state === false) {
			this.in_theatre = false;
		}
		else {
			this.in_theatre = !this.in_theatre;
		}
		if (this.in_theatre) this.action('theatre-on');
		else this.action('theatre-off')
	}
}
