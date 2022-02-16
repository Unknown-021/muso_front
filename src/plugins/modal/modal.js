import Vue from 'vue';
import ModalsContainer from './modals-container.vue';

export function initModal(app) {
  Vue.prototype.$modal = createModalContainer(app);

  app.$router.afterEach(() => {
    app.$modal.destroyAll();
  });
}

function createModalContainer(app) {
  return new Vue({
    ...ModalsContainer,
    parent: app
  }).$mount();
}
