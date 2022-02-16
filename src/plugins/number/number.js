import { assert } from 'helpers/utils';

export default {
  install(Vue) {
    Vue.prototype.$number = function(value) {
      assert('formatNumber' in this.$root, 'formatNumber method should be defined on Vue root instance');
      return this.$root.formatNumber(value);
    };
  }
};

export function createNumberFormatter(locale) {
  const { format } = new Intl.NumberFormat(locale);
  return value => format(value);
}
