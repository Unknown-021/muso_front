import { notification as createNotification } from './notification.utils';
import VerificationNotification from './verification-notification';

export { musoProfile, ActionStatus } from './notification.utils';

export function notification(options) {
  return createNotification({
    ...options,
    components: {
      ...options.components,
      VerificationNotification
    }
  });
}
