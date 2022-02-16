import { assert } from 'helpers/utils';
import { isServer } from 'helpers/constants';
export default {
  install(Vue) {
    Vue.prototype.$serverRedirect = function(code, route) {
      assert(isServer, 'This method can be called only on the server');
      const resolved = this.$router.resolve(route);
      const url = resolved.route.fullPath;
      throw { code, url };
    };
  }
};
