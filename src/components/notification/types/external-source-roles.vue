<template>
  <notification :notification="notif" data-type="user" v-bind="$attrs" v-on="$listeners">
    <template #text>
      Muso.AI has gather stream sources for <span class="c-overlay-1">{{notification.payload.count}}</span> tracks
    </template>
  </notification>
</template>

<script>
import { notification, musoProfile } from '../create-notification';

export default notification({
  name: 'ExternalSourcesRoles',
  computed: {
    notif() {
      return {
        ...this.notification,
        profile: musoProfile
      };
    }
  }
});
</script>
