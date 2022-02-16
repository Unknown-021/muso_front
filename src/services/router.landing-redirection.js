import { profileRoute } from '../helpers/routing';

export function initHomeRedirection(router, store) {
  router.beforeEach((to, from, next) => {
    if (to.name === 'home') {
      try {
        next(getHomeRedirect(store));
      } catch (error) {
        if (error.url) {
          window.location = error.url;
        } else {
          throw error;
        }
      }
    } else {
      next();
    }
  });
}

export function getHomeRedirect(store) {
  if (store.getters['auth/isUserLoggedIn']) {
    return profileRoute(store.getters['user/data']);
  } else {
    throw { code: 302, url: 'https://muso.ai' };
  }
}
