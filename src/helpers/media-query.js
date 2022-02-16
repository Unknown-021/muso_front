import { assert } from 'helpers/utils';

export const phoneMedia = createMedia('(max-width: 767px)');
export const tabletMedia = createMedia('(min-width: 768px)');
export const beforeDesktopMedia = createMedia('(max-width: 1279px)');
export const desktopMedia = createMedia('(min-width: 1280px)');

export function syncMediaWithComponent(media, component, property) {
  assert(property in component, `Component doesn't have property "${property}"`);

  const setComponentProperty = (matches) => {
    (component)[property] = matches;
  };
  const handleListener = (event) => setComponentProperty(event.matches);

  setComponentProperty(media.matches);
  media.addListener(handleListener);

  component.$once('hook:beforeDestroy', () => {
    media.removeListener(handleListener);
  });
}

function createMedia(mediaQuery) {
  return window.matchMedia(mediaQuery);
}

export const vuePlugin = {
  install(Vue) {
    Vue.prototype.$syncMediaWithComponent = function(media, property) {
      const mediaObj = (typeof media === 'string') ? createMedia(media) : media;
      return syncMediaWithComponent(mediaObj, this, property);
    };
    Vue.prototype.$mediaQueries = {
      PHONE: phoneMedia,
      TABLET: tabletMedia,
      BEFORE_DESKTOP: beforeDesktopMedia,
      DESKTOP: desktopMedia
    };
  }
};
