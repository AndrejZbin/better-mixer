class ChatMessagesComponent extends Component {
    constructor() {
        super('chat-messages');

        let chat_interval = null;
        this.el('chat').on_actions({
            'url-changed-channel': function() {
                // force load
                this.obj_promise();
            },
            'loaded': function() {
                let sub_only = false;
                if (chat_interval !== null) clearInterval(chat_interval);
                chat_interval = setInterval(() => {
                    this.obj.find('.message__3cqAS .messageContent__3EH9F:not(.custom-message-visited)').each(function() {
                        let el = $(this);
                        el.addClass('custom-message-visited');
                        let children = el.children();
                        let member_badge = $(children.get(0)).find('img');
                        if (member_badge.length === 0 && sub_only) el.remove();
                        else {
                            member_badge.prependTo(children.get(0)).css('margin-right', '0.4em');
                            el.addClass('custom-message-visible');
                        }
                    });
                }, 100);
            },
            'url-changed': function() {
                if (chat_interval !== null) {
                    clearInterval(chat_interval);
                    chat_interval = null;
                }
            }
        });

        add_css('css/chatmessages/base.css');
    }
}
