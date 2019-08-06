var BROWSER;
if (typeof browser !== "undefined") BROWSER = browser;
else if (typeof chrome !== "undefined") BROWSER = chrome;

class Options {
    constructor() {
        const fields = ['theatre_top', 'theatre_bottom', 'remove_spark', 'move_badge', 'compact_chat', 'sub_only', 'resize_top_panel', 'remove_avatars'];
        this.options = {};

        let self = this;

        let counter = 0;

        function is_finished() {
            counter++;
            if (counter === fields.length) {
                self.options['sub_only'] = !self.options['sub_only']; //TODO: clean this
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

    oooo(field) {
        return !!this.options[field];
    }
}

var OPTIONS = new Options();
