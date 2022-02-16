import Notification from './notification';
import NotificationActions from './notification-actions';
import AlbumLink from './notification-album-link.vue';
import RolesList from './notification-roles-list.vue';

export const musoProfile = {
  fullName: 'Muso.AI',
  isVerified: true,
  avatarUrl: '/images/muso-avatar.png'
};

export const ActionStatus = {
  ACCEPTED: 'accepted',
  DECLINED: 'declined'
};

const defaultOptions = {
  components: {
    Notification,
    NotificationActions,
    AlbumLink,
    RolesList
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    attrs() {
      return {
        notification: this.notification,
        route: this.route,
        ...this.$attrs
      };
    }
  }
};

export function notification(options) {
  return {
    ...options,
    components: {
      ...defaultOptions.components,
      ...options.components
    },
    props: {
      ...defaultOptions.props,
      ...options.props
    },
    computed: {
      ...defaultOptions.computed,
      ...options.computed
    }
  };
}
