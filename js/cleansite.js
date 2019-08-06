class CleanComponent extends Component {
    constructor() {
        super('clean-site');

        if (OPTIONS.oooo('compact_chat')) add_css('css/cleansite/compact.css');
        if (OPTIONS.oooo('remove_spark')) add_css('css/cleansite/spark-badges.css');
        if (OPTIONS.oooo('remove_avatars')) add_css('css/cleansite/avatars.css');
    }
}
