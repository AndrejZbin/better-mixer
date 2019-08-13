class WebElement {
    constructor(query) {
        this._query = query;
        this._obj = null;
        this._events = {};
    }
    get query() {
        return this._query;
    }

    get obj() {
        if (!this._obj || !this._obj[0] || !this._obj[0].isConnected) {
            if (this._obj && this._obj[0] && !this._obj[0].isConnected) {
                this.action('unloaded');
            }
            this._obj = $(this.query);
            if (this._obj[0]) this.action('loaded');
        }
        return this._obj;
    }

    obj_promise(refresh=false) {
        return new Promise((resolve, reject) => {
            if (refresh) this._obj = $(this.query);
            if (!this._obj || !this._obj[0] || !this._obj[0].isConnected) {
                if (this._obj && this._obj[0] && !this._obj[0].isConnected) {
                    this.action('unloaded');
                }
                this._obj = $(this.query);
                if (this._obj[0]) {
                    this.action('loaded');
                    resolve(this._obj);
                    return;
                }
                let repeats = 0;
                let interval = setInterval(() => {
                    repeats++;
                    let obj = $(this.query);
                    if (obj && obj[0]) {
                        this._obj = obj;
                        clearInterval(interval);
                        this.action('loaded');
                        resolve(this._obj);
                    }
                    else if (repeats > 10) {
                        clearInterval(interval);
                        reject();
                    }
                }, 500);
            }
            else resolve(this._obj);
        });
    }

    on_action(event, f) {
        if (!this._events[event]) this._events[event] = [f];
        else this._events[event].push(f);
    }

    on_actions(actions) {
        for (let action in actions) {
            if (actions.hasOwnProperty(action)) {
                this.on_action(action, actions[action]);
            }
        }
    }

    action(event, ...args) {
        if (this._events.hasOwnProperty(event)) {
            for (let callback of this._events[event]) {
                callback.bind(this)(...args);
            }
        }
    }
}


class ElementManager {
    constructor() {
        this.elements = {};
    }

    add_element(name, query) {
        if (this.elements[name] && this.elements[name].query !== query) {
            console.error(`Element with name ${name} but different query already exists`);
        }
        if (!this.elements[name]) {
            this.elements[name] = new WebElement(query);
        }
        return this.elements[name];
    }

    el(name) {
        if (!this.elements[name]) {
            console.error(`Element with name ${name} not found`);
        }
        return this.elements[name];
    }
}


function add_css(link) {
    EM.el('head').obj_promise()
        .then(obj => {
            obj.append($(`<link rel='stylesheet' href='${BROWSER.runtime.getURL(link)}' type='text/css' media='screen' />`));
        });
}


const EM = new ElementManager();
EM.add_element('sub_popup', 'b-subscription-bundle-host');
EM.add_element('stage', '.stage');
EM.add_element('header', 'b-desktop-header');
EM.add_element('chat', 'aside.chat');
EM.add_element('channel_page', 'div.channel-page');
EM.add_element('profile_header', 'div.layout-row.layout-align-space-between-start.profile-header');
EM.add_element('chat_resizer', 'b-channel-chat-resizer');
EM.add_element('theatre_button_bound', 'light-desktop-controls .toolbar .right .control:last-child');
EM.add_element('language_selector', 'b-language-selector');
EM.add_element('head', 'head');
EM.add_element('mute_button', 'light-desktop-controls .toolbar .right light-volume-control button');
EM.add_element('volume_slider', 'light-desktop-controls .toolbar .right light-volume-control bui-slider input');
EM.add_element('fullscreen_button', '#fullscreen-button');
EM.add_element('play_button', '#player-state-button');
EM.add_element('chat_input', '#chat-input textarea');