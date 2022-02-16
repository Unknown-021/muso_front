<template>
  <notification :notification="notif" data-type="user" v-bind="$attrs" v-on="$listeners">
    <template #avatar-icon>
      <img width="12" :src="avatarIconSrc" />
    </template>
    <template #text>
      <slot />
    </template>
    <notification-actions v-if="actionButtons.length" :buttons="actionButtons" />
  </notification>
</template>

<script>
import { notification, musoProfile } from './notification.utils';

const statuses = ['accepted', 'rejected'];

export default notification({
  name: 'verification-notification',
  props: {
    status: {
      type: String,
      required: true,
      validator: value => statuses.includes(value)
    }
  },
  computed: {
    notif() {
      return {
        ...this.notification,
        profile: this.notification.profile || musoProfile
      }
    },
    avatarIconSrc() {
      switch (this.status) {
        case 'accepted':
          return '/images/icons/shield-check.svg';
        case 'rejected':
          return '/images/icons/shield-cross.svg';
        default:
          return;
      }
    },
    actionButtons() {
      if (this.status === 'rejected') {
        return [{
          action: 'support',
          title: 'Support',
          props: {
            component: 'a',
            variant: 'primary',
            href: 'mailto:support@muso.ai'
          }
        }];
      }

      return [];
    }
  }
});
</script>