class WebElement {
    constructor(query, events={}) {
        this._query = query;
        this._obj = null;
        this._events = events;
    }
    get query() {
        return this._query;
    }

    get obj() {
        return this._obj;
    }

    set obj(obj) {
        this._obj = obj;
    }

    on_action(event, f) {
        this._events[event] = f;
    }

    action(event, ...args) {
        if (this._events.hasOwnProperty(event) && this._obj) {
            this._events[event].bind(this)(...args);
        }
    }
}


function load_elements(elements) {
    return new Promise((resolve, reject) => {
        clear_elements(elements);
        let repeats = 0;
        let interval = setInterval(() => {
            repeats++;
            let loaded = true;
            for (let element of elements) {
                let obj = $(element.query);
                if (obj && obj[0]) element.obj = obj;
                else loaded = false;
            }
            if (loaded) {
                console.log('elements loaded');
                clearInterval(interval);
                resolve(elements);
            }
            else if (repeats > 10) {
                console.log('clear load interval');
                reject();
            }
        }, 500);
    });
}


function clear_elements(elements) {
    for (let element of elements) {
        element.obj = null;
    }
}
