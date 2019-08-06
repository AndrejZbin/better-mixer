class Component {
    constructor(name) {
        this.name = name;
        this.elements = new Set();
        this.main();
        this.event_queue = [];
        this.timeout = null;

    }
    el(element) {
        this.elements.add(element);
        EM.el(element).obj_promise(); // force load
        return EM.el(element);
    }

    action(event, ...args) {
        console.log('action ' + event);
        this.event_queue.push({e:event, a:args});
        this._start_job();
    }

    url_change(type=null) {
        if (type) this.action('url-changed-' + type);
        else this.action('url-changed');
    }

    main() {
        console.log('Component loaded: ' + this.name);
    }

    error(err) {
        console.error('Error at component: ' + this.name);
        console.error(err);
    }

    _start_job() {
        if (this.timeout) return;
        this.timeout = setTimeout(() => {
            for (let event of this.event_queue) {
                for (let element of this.elements) {
                    if (EM.elements.hasOwnProperty(element)) {
                        EM.elements[element].action(event.e, ...event.a);
                    }
                }
            }
            this.event_queue = [];
            this.timeout = null;
        },0);
    }
}
