import ConfirmModal from './confirm-modal.vue';

export default {
  install(Vue) {
    const Component = Vue.extend(ConfirmModal);

    Vue.prototype.$confirm = (options = {}) => {
      const confirm = new Component({
        propsData: options
      }).$mount();

      return confirm;
    }
  }
}
