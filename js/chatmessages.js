class ChatMessagesComponent extends Component {
    constructor() {
        const chat = new WebElement('b-chat-client-host-component', {
            'loaded': function() {

            },
            'url-change': function () {

            }
        });
        const head= new WebElement('head', {
            'loaded': function() {
                this.obj.append($(`<link rel='stylesheet' href='${BROWSER.runtime.getURL('css/chatmessages/base.css')}' type='text/css' media='screen' />`));
            },
            'url-change': function () {

            }
        });
        super('chat-messages', [chat, head]);
        this.chat = chat;
        this.sub_only = false;
    }
    main() {
        super.main();
        let sub_only = this.sub_only;
        let interval = setInterval(() => {
            if (!this.chat.obj || !this.chat.obj.isConnected) {
					this.chat.obj = $(this.chat.query);
            }
            this.chat.obj.find('.message__3cqAS .messageContent__3EH9F:not(.custom-message-visited)').each(function() {
                let el = $(this);
                el.addClass('custom-message-visited');
                let children = el.children();
                let member_badge = $(children.get(0)).find('img');
                if (member_badge.length === 0 && sub_only) {
                    el.remove();
                }
                else {
                    member_badge.prependTo(children.get(0)).css('margin-right', '0.4em');
                    el.addClass('custom-message-visible');
                }
            });
        }, 100);
    }
}