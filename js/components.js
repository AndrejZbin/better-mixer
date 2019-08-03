class Component {
    constructor(name, elements) {
        this.name = name;
        this.elements = elements;
    }
    action(event, ...args) {
        console.log('action ' + event);
        for (let element of this.elements) element.action(event, ...args)
    }
    reload() {
        load_elements(this.elements)
            .then(elements => {
                this.elements = elements;
                this.main();
            })
            .catch(err => {
                this.elements = [];
                this.error(err)
            });
    }
    load() {
        this.reload();
    }
    url_change() {
        this.action('url-change');
    }
    main() {
        console.log('Components loaded: ' + this.name);
    }
    error(err) {
        console.log('Error at component: ' + this.name);
        console.log(err);
    }
}
