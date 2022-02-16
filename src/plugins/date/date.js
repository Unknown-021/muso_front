import { assert } from 'helpers/utils';

export default {
  install(Vue) {
    Vue.prototype.$date = function(...args) {
      assert('formatDate' in this.$root, '"formatDate" method is required on app root level');
      return this.$root.formatDate(...args);
    };
  }
};

export function createDateFormatter(locale) {
  const primary = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' });
  const compact = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'numeric', year: 'numeric' });
  const dayMonth = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' });
  const short = new Intl.DateTimeFormat(locale, { month: 'short', year: '2-digit' });
  const long = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  const numeric = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'numeric', year: '2-digit' });

  const map = {
    primary,  // 8 Oct 2021
    compact,  // 08/10/2021
    dayMonth, // 8 Oct
    short,    // Oct 21
    long,     // 8 October 2021
    numeric,  // 08/10/21
  };

  return (date, type = 'primary') => {
    const dateObj = (date instanceof Date)
      ? date
      : new Date(date);

    const { format } = map[type];
    return format(dateObj);
  };
}
