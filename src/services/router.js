import Vue from 'vue';
import VueRouter from 'vue-router';
import BasicError from 'errors/basic';
import Meta from 'vue-meta';
import { decorateRouter } from './router.decorator';

Vue.use(VueRouter);
Vue.use(Meta);

export function createRouter({ origin = '', ...options } = {}) {
  const router = new VueRouter({
    mode: 'history',
    linkActiveClass: '',
    linkExactActiveClass: '',
    ...options
  });

  router.origin = origin;
  decorateRouter(router);

  router.onError(error => {
    if (error instanceof BasicError) {
      let message = error.getMessage();
      let route = error.getRouteName();
      if (route) {
        router.push({
          name: error.getRouteName()
        }, Vue.$notify(message, error.getStatus()));
      } else {
        Vue.$notify(message, error.getStatus())
      }
    } else {
      console.error(error);
    }
  });

  return router;
}