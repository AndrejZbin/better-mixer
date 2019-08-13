var BROWSER;
if (typeof browser !== "undefined") BROWSER = browser;
else if (typeof chrome !== "undefined") BROWSER = chrome;

const fields = ['theatre_top', 'theatre_bottom', 'remove_spark', 'move_badge', 'compact_chat', 'sub_only', 'resize_top_panel', 'remove_avatars', 'theatre_automatic', 'keyboard_control', 'black_theatre', 'remove_purchase'];

function saveOptions(e) {
    e.preventDefault();
    let settings = {};
    for (let field of fields) {
        settings[field] = document.querySelector('#' + field).checked;
    }
    BROWSER.storage.sync.set(settings);
}

function restoreOptions() {
    function setChoice(field) {
        return function(value) {
            document.querySelector("#" + field).checked = !!value[field]
        }
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    for (let field of fields) {
            if (typeof browser !== "undefined")
                browser.storage.sync.get(field)
                    .then(setChoice(field), onError);
            else if (typeof chrome !== "undefined")
                chrome.storage.sync.get(field, setChoice(field));
    }


}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
