export function initLogoutHook(router, store) {
  router.beforeEach(async (to, from, next) => {
    const matchedRoute = to.matched.find(route => route.meta.logout);
    if (typeof matchedRoute?.meta.logout === 'function') {
      const needToLogout = matchedRoute.meta.logout(to);
      if (needToLogout) {
        await store.dispatch('auth/logout');
      }
    }

    next();
  });
}

export function initProtectedRoutesHook(router, store) {
  router.beforeEach((to, from, next) => {
    const matchedRoute = to.matched.find(route => route.meta.requiresAuth);

    const { requiresAuth = false } = matchedRoute?.meta || {};
    const isRedirect = (typeof requiresAuth === 'function')
      ? requiresAuth(to)
      : requiresAuth;
      
    if (
      isRedirect &&
      !store.getters['auth/accessToken']
    ) {
      next({ name: 'login' });
    } else {
      next();
    }
  });
}

export function initGuestOnlyRoutesHook(router, store) {
  router.beforeEach((to, from, next) => {
    if (
      to.matched.some(route => route.meta.guestOnly) &&
      store.getters['auth/accessToken']
    ) {
      next({ name: 'home' });
    } else {
      next();
    }
  });
}

export function initAuthRedirectHook(router, store) {
  router.beforeResolve((to, from, next) => {
    next(getAuthRedirectRoute(to, store));
  });
}

export function getAuthRedirectRoute(currentRoute, store) {
  const user = store.getters['user/data'];
  if (!user) return;

  const matchedRoute = currentRoute.matched.find(route => route.meta.authRedirect);
  if (!matchedRoute) return;

  return matchedRoute.meta.authRedirect(user);
}

export function initAuthViaUrlQueryTokenHook(router, store) {
  router.beforeEach(async (to, from, next) => {
    if ('appToken' in to.query) {
      next(await handleRouteAppToken(to, store));
    } else {
      next();
    }
  });
}

async function handleRouteAppToken(route, store) {
  const { appToken, ...query } = route.query;
  try {
    await store.dispatch('auth/loginWithToken', {
      appToken,
    });
    return {
      path: route.path,
      query,
    };
  } catch(e) {
    return {
      path: '/login',
      query: {
        ...query,
        errorMessage: e.message,
      }
    };
  }
}
