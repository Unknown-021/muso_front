// IMPORTANT: import of createApp method should be at the very beginning.
// We need it to make sure that styles from application.scss will be imported before all components' styles
import { createApp } from './application';
import Vue from 'vue';
import Notify from 'plugins/notify';
import * as mediaQuery from 'helpers/media-query';
import { ClientCookie } from './libs/client-cookie';
import { DeviceDetectorPlugin } from 'helpers/device-detector';
import { initHomeRedirection } from './services/router.landing-redirection';

Vue.use(Notify, {
  selector: '#app-dialog',
  duration: 5000,
});
Vue.use(DeviceDetectorPlugin);
Vue.use(mediaQuery.vuePlugin);

const context = {
  nonce: getNonce(),
  origin: window.location.origin,
  userLanguages: navigator.languages,
  cookie: new ClientCookie()
};

export async function createClientApp(component, options) {
  const appShell = await createApp(component, context, options);
  return initApp(appShell);
}

function initApp(appShell) {
  if (window.__INITIAL_STATE__) {
    appShell.store.replaceState(window.__INITIAL_STATE__);
  }
  initHomeRedirection(appShell.router, appShell.store);
  return appShell;
}

function getNonce() {
  return document.querySelector('script[nonce]').nonce;
}

if (module.hot) {
  const api = require('vue-hot-reload-api');
  const Vue = require('vue');

  api.install(Vue);
  if (!api.compatible) {
    throw new Error(
      'vue-hot-reload-api is not compatible with the version of Vue you are using.',
    );
  }

  module.hot.accept();
}
