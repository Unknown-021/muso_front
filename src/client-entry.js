import './assets/styles/application.scss';
// IMPORTANT: import of createApp method should be at the very beginning.
// We need it to make sure that styles from application.scss will be imported before all components' styles
import { createClientApp } from './client-application';
import { routes } from './services/routes/routes';
import Vue from 'vue';
import Application from 'components/application';
import infiniteScroll from 'vue-infinite-scroll';
import Confirm from 'plugins/confirm';
import { initModal } from 'plugins/modal/modal';
import { initClientFetchDataMixin } from 'mixins/client-fetch-data';

Vue.use(infiniteScroll);
Vue.use(Confirm, {
  selector: 'body',
});

createClientApp(Application, {
  router: {
    routes
  }
}).then(initApp);

function initApp({ app, router }) {
  initModal(app);

  router.onReady(() => {
    app.$once('hook:mounted', initClientFetchDataMixin);
    app.$mount('#application');
  });
}
