import Vue from 'vue';
import Vuex from 'vuex';

import { createModels } from '../models/models';
import auth from 'store/modules/auth/auth';
import analytics from 'store/modules/analytics/analytics';
import user from 'store/modules/user/user';
import song from 'store/modules/song';
import search from 'store/modules/search';
import artist from 'store/modules/artist';
import member from 'store/modules/member';
import profile from 'store/modules/profile';
import collection from 'store/modules/collection';
import socialAccount from 'store/modules/social-account';
import role from 'store/modules/role';
import genre from 'store/modules/genre';
import payment from 'store/modules/payment/payment';
import notification from 'store/modules/notification/notification';
import layout from 'store/modules/layout';

Vue.use(Vuex);

export async function createStore({ cookie, http, httpNext }) {
  const store = new Vuex.Store({
    modules: {
      auth,
      analytics,
      user,
    	song,
      search,
      artist,
      member,
      profile,
      collection,
      socialAccount,
      role,
      genre,
      payment,
      notification,
      layout,
    },
    strict: Vue.config.debug
  });

  store.cookie = cookie;
  store.http = http;
  store.httpNext = httpNext;
  store.models = createModels(httpNext);

  return initStore(store);
};

async function initStore(store) {
  await Promise.all([
    store.dispatch('auth/init'),
    store.dispatch('payment/init')
  ]);

  return store;
}
