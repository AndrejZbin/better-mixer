class KeyboardComponent extends Component {
    constructor() {
        super('keyboard')
        //TODO: move this to another component
        if (OPTIONS.opt('keyboard_control'))
            $(document).keydown((e) => {
                if ([77, 109].includes(e.which) && !['TEXTAREA', 'TEXTFIELD'].includes(e.target.nodeName)) {
                    this.el('mute_button').obj_promise()
                        .then(obj => {
                            obj.click();
                        })
                } else if ([37, 39].includes(e.which) && !['TEXTAREA', 'TEXTFIELD'].includes(e.target.nodeName)) {
                    console.log('aaaaa')
                    this.el('volume_slider').obj_promise()
                        .then(obj => {
                            obj.focus();
                        })
                } else if ([70, 102].includes(e.which) && !['TEXTAREA', 'TEXTFIELD'].includes(e.target.nodeName)) {
                    this.el('fullscreen_button').obj_promise()
                        .then(obj => {
                            obj.click();
                        })
                } else if ([32].includes(e.which) && !['TEXTAREA', 'TEXTFIELD'].includes(e.target.nodeName)) {
                    this.el('play_button').obj_promise()
                        .then(obj => {
                            obj.click();
                        });
                    e.preventDefault()
                } else if ([9].includes(e.which) && !['TEXTAREA', 'TEXTFIELD'].includes(e.target.nodeName)) {
                    this.el('chat_input').obj_promise()
                        .then(obj => {
                            console.log(obj)
                            obj.focus();
                        });
                    e.preventDefault()
                }
            });

    }
}