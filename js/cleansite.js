class CleanComponent extends Component {
    constructor() {
        super('clean-site');

        if (OPTIONS.opt('compact_chat')) add_css('css/cleansite/compact.css');
        if (OPTIONS.opt('remove_spark')) add_css('css/cleansite/spark-badges.css');
        if (OPTIONS.opt('remove_avatars')) add_css('css/cleansite/avatars.css');
    }
}
