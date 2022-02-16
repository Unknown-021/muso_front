<template>
  <notification data-type="user" v-bind="attrs" v-on="$listeners">
    <template #text>
      acccepted you collaborator invite to <album-link :album="notification.payload.album" />.
    </template>
  </notification>
</template>

<script>
import { notification } from '../create-notification';
import { albumRoute } from 'helpers/routing';

export default notification({
  name: 'RespondCollaboratorInvite',
  computed: {
    route() {
      return albumRoute(this.notification.payload.album);
    }
  }
});
</script>
