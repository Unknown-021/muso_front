import Vue from 'vue';

import JoinFilter from 'filters/join';
import PluralFilter from 'filters/plural';
import EmptyFilter from 'filters/empty';
import DurationFilter from 'filters/duration';
import NumberFilter from 'filters/number';
import AbbreviateFilter from 'filters/abbreviate';
import URLFilter from 'filters/url';

let filters = {
    JoinFilter,
    PluralFilter,
    EmptyFilter,
    DurationFilter,
    NumberFilter,
    AbbreviateFilter,
    URLFilter,
};

function init() {
    for (let key in filters) {
        Vue.filter(key, filters[key]);
    }
}

export default {
    init,
};
