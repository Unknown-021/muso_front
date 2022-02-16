import { isServer } from 'helpers/constants';

export default {
  install(Vue) {
    const handler = isServer
      ? serverHandler
      : clientHandler;

    Vue.prototype.$handleError = function(error) {
      handler(this, error);
    };
  }
};

function serverHandler(vm, error) {
  throw error;
}

function clientHandler(vm, error) {
  vm.$notify(error.message || 'Something went wrong. Please, try again later.', 'error');
}
