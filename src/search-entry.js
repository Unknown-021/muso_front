import './assets/styles/application-lite.scss';
import { createClientApp } from './client-application';
import MusoSearch from 'components/muso-search';
import { routes } from './services/routes/landing-routes';

window.createMusoSearch = createMusoSearch;

async function createMusoSearch(options) {
  const app = await createClientApp(MusoSearch, {
    router: {
      origin: 'https://credits.muso.ai',
      mode: 'abstract',
      routes
    }
  });
  initApp(app, options);
  return app;
}

function initApp({ app, router }, { el }) {
  router.initPush('/');
  router.onReady(() => {
    app.$mount(el);
  });
}
