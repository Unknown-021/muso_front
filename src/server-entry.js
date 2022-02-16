import './assets/styles/application.scss';
import { createApp } from './application';
import Application from 'components/application';
import { routes } from './services/routes/routes';
import { isNavigationFailure, NavigationFailureType } from 'vue-router';

export default context => {
  // since there could potentially be asynchronous route hooks or components,
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.
  return new Promise(async(resolve, reject) => {
    const { app, router, store } = await createApp(Application, context, {
      router: {
        routes
      }
    });

    // set server-side router's location
    router.push(context.url)
      // navigation failure of type "redirected" is handled inside
      // router.onReady hook, that's we silence this error here
      .catch(ignoreRedirectionFailure);

    context.meta = app.$meta();

    // wait until router has resolved possible async components and hooks
    router.onReady(() => {
      const isInitialRouteRedirected = (router.currentRoute.fullPath !== context.url);
      // initial route redirected to another route, reject with 302
      if (isInitialRouteRedirected) {
        return reject({ code: 302, url: router.currentRoute.fullPath })
      }

      const matchedComponents = router.getMatchedComponents();
      const notFoundPage = matchedComponents.find(route => route.name === 'not-found');
      // no matched routes, reject with 404
      if (notFoundPage) {
        return reject({ code: 404 });
      }
      // This `rendered` hook is called when the app has finished rendering
      context.rendered = () => {
        // After the app is rendered, our store is now
        // filled with the state from our components.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        context.state = store.state;
      };
      // the Promise should resolve to the app instance so it can be rendered
      resolve(app);
    }, reject);
  })
}

function ignoreRedirectionFailure(failure) {
  if (!isNavigationFailure(failure, NavigationFailureType.redirected)) {
    throw failure;
  }
}
