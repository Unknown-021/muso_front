export function decorateRouter(router) {
  const { push } = router;
  router.initPush = function() {
    return push.apply(this, arguments);
  }

  if (!router.origin) return;

  const { resolve } = router;
  router.resolve = function() {
    const { origin = '' } = router;
    const { href, ...rest } = resolve.apply(this, arguments);
    return {
      ...rest,
      href: origin + href,
    };
  }

  router.push = router.replace = function(...args) {
    const { href } = this.resolve(...args);
    window.location = href;
  };
}
