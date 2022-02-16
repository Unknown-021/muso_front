import NotifyContainer from './notify-container';

export default {
  install(Vue, options = {}) {
    const NotifyComponent = Vue.extend(NotifyContainer);
    const notify = new NotifyComponent({
      el: options.selector || 'body',
      propsData: {
        duration: options.duration || 3000
      }
    });

    Vue.prototype.$notify = (message, type = 'info', duration) => {
      return notify.show({ message, type, duration });
    }
  }
};
