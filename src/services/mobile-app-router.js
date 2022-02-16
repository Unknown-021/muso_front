import Router from 'vue-router';
const router = new Router({
  mode: 'abstract'
});

const MOBILE_APPLICATION_SCHEME = 'muso://';

const routesMap = {
  'email-confirmed': {
    path: 'home',
    query: {
      reason: 'email_confirmed'
    }
  },
  'password-reset': {
    path: 'password-recovery',
    query: {
      code: undefined
    }
  },
  'analytics-paid': {
    path: 'analytics/payment-successful',
  }
};

export default {
  resolve,
  push
};

function resolve(route) {
  const path = typeof route === 'string'
    ? route
    : resolveRoutePath(route);

  return `${MOBILE_APPLICATION_SCHEME}${path}`;
}

function push(route) {
  window.location = resolve(route);
}

function resolveRoutePath({ name, query }) {
  const route = routesMap[name];
  if (!route) {
    throw new TypeError(`Unknown mobile app route name: "${name}"`);
  }
  if (!route.path) {
    throw new TypeError(`"path" property should be defined on mobile app route: "${route}"`);
  }
  const resolved = router.resolve({
    path: route.path,
    query: {
      ...route.query,
      ...query
    }
  });
  const path = resolved.route.fullPath.slice(1);

  return path;
}
