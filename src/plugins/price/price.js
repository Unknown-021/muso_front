import { assert } from 'helpers/utils';

export default {
  install(Vue) {
    Vue.prototype.$price = function(value) {
      assert('formatPrice' in this.$root, 'formatPrice method should be defined on Vue root instance');
      return this.$root.formatPrice(value);
    };
  }
};

export function createPriceFormatter(locale) {
  // NOTE: Safari doesn't support "narrowSymbol" value for "currencyDisplay" property.
  // link: https://stackoverflow.com/questions/64144596/currencydisplay-must-be-either-code-symbol-or-name-safari-issue
  const { format } = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' });
  // All prices are multiplied by 100.
  // We do it to eliminate possible problems with the floating point in JavaScript.
  // That's why we do here divison by 100 to conver number to "normal" format.
  return value => format(value / 100);
}
