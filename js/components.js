class Component {
    constructor(name) {
        this.name = name;
        this.elements = new Set();
        this.main();

    }
    el(element) {
        this.elements.add(element);
        EM.el(element).obj_promise(); // force load
        return EM.el(element);
    }

    action(event, ...args) {
        console.log('action ' + event);
        for (let element of this.elements) {
            if (EM.elements.hasOwnProperty(element)) {
                EM.elements[element].action(event, ...args);
            }
        }
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
}
