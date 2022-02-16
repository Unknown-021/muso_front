import Vue from 'vue';
import focus from './focus';

let items = {
    focus,
};

function init() {
    for (let key in items) {
        Vue.directive(key, items[key]);
    }
}

export default {
    init,
};
