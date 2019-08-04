class CleanComponent extends Component {
    constructor() {
        const head= new WebElement('head', {
            'loaded': function() {
                this.obj.append($(`<link rel='stylesheet' href='${BROWSER.runtime.getURL('css/cleansite/compact.css')}' type='text/css' media='screen' />`));
                this.obj.append($(`<link rel='stylesheet' href='${BROWSER.runtime.getURL('css/cleansite/badges.css')}' type='text/css' media='screen' />`));
                this.obj.append($(`<link rel='stylesheet' href='${BROWSER.runtime.getURL('css/cleansite/avatars.css')}' type='text/css' media='screen' />`));
            },
            'url-change': function () {

            }
        });
        const body = new WebElement('body');
        super('clean-site', [head, body]);
        this.body = body;
    }
    main() {
        super.main();
    }
}