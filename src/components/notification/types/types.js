import { notificationTypes } from 'store/modules/notification/notification.constants';

const isAllowed = (type) => notificationTypes.includes(type);

// Here we automatically import all .vue components and use their "name" property as named export
const modules = {};

function exportFiles(files) {
  files.keys().forEach((key) => {
    if (key === './types.js') return
    const component = files(key).default;
    const notificationType = component.name;

    if (process.env.NODE_EVN !== 'production') {
      if (!isAllowed(notificationType)) {
        throw new TypeError(`Unknown notification type: "${notificationType}". Allowed values: ${notificationTypes.join(', ')}`);
      }
    }
    modules[notificationType] = component;
  });
}

const files = require.context('.', true, /\.vue$/);
exportFiles(files);

export default modules
