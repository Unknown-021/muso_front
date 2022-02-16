import Vue from 'vue';
import { createStore } from 'store';
import { createRouter } from 'services/router';
import ServerRedirect from 'services/router-redirect-plugin';
import { createHttp, createHttpNext, initHttpRequestInterceptor } from './services/http';
import {
  initLogoutHook,
  initAuthRedirectHook,
  initProtectedRoutesHook,
  initGuestOnlyRoutesHook,
  initAuthViaUrlQueryTokenHook,
} from './services/router.hooks';
import Filters from 'filters/index';
import Directives from 'directives/index';
import DateFormatter, { createDateFormatter } from 'plugins/date/date';
import NumberFormatter, { createNumberFormatter } from 'plugins/number/number';
import PriceFormatter, { createPriceFormatter } from 'plugins/price/price';
import ErrorHandler from 'plugins/handle-error/handle-error';
import vClickOutside from 'v-click-outside'

Vue.config.debug = process.env.NODE_ENV !== 'production';

Vue.use(ErrorHandler);
Vue.use(ServerRedirect);
Vue.use(DateFormatter);
Vue.use(NumberFormatter);
Vue.use(PriceFormatter);
Vue.use(vClickOutside);

Filters.init();
Directives.init();

export const createApp = async (component, context, options = {}) => {
  const router = createRouter(options.router);
  const { cookie } = context;
  const http = createHttp();
  const httpNext = createHttpNext();
  const store = await createStore({ cookie, http, httpNext });
  initHttpRequestInterceptor(http, store);
  initHttpRequestInterceptor(httpNext, store);

  initLogoutHook(router, store);
  initAuthViaUrlQueryTokenHook(router, store);
  initProtectedRoutesHook(router, store);
  initGuestOnlyRoutesHook(router, store);
  initAuthRedirectHook(router, store);

  const app = new Vue({
    store,
    router,
    data: {
      nonce: context.nonce,
      origin: context.origin,
      userLanguages: context.userLanguages
    },
    computed: {
      locale() {
        const [locale] = this.userLanguages;
        return locale === 'en-US' ? locale : 'en-GB';
      },
      formatDate() {
        return createDateFormatter(this.locale);
      },
      formatNumber() {
        return createNumberFormatter(this.locale);
      },
      formatPrice() {
        return createPriceFormatter('en-US');
      }
    },
    render: h => h(component)
  });

  return { app, router, store };
};
