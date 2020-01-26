var BROWSER;
if (typeof browser !== "undefined") BROWSER = browser;
else if (typeof chrome !== "undefined") BROWSER = chrome;

class Options {
    constructor() {
        const fields = ['remove_spark', 'move_badge', 'compact_chat', 'sub_only', 'remove_avatars', 'theatre_automatic', 'keyboard_control', 'black_theatre', 'remove_purchase'];
        this.options = {};

        let self = this;

        let counter = 0;

        function is_finished() {
            counter++;
            if (counter === fields.length) {
                self.options['sub_only'] = !self.options['sub_only']; //TODO: clean this
                self.options['resize_top_panel'] = false; // TODO: disabled for now
                self.loaded = true;
                console.log('settings loaded')
            }
        }

        function setChoice(field) {
            return function(value) {
                self.options[field] = !value[field]; // disabled
                is_finished();
            }
        }

        function onError(field) {
            return function(err) {
                self.options[field] = true;
                is_finished();
            }
        }

        for (let field of fields) {
            if (typeof browser !== "undefined")
                BROWSER.storage.sync.get(field)
                    .then(setChoice(field), onError(field));
            else if (typeof chrome !== "undefined")
                BROWSER.storage.sync.get(field, setChoice(field));
            else this.loaded = true;
        }


    }

    opt(field) {
        return !!this.options[field];
    }
}

var OPTIONS = new Options();

