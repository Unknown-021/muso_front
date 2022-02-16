<template>
  <notification data-type="user" v-bind="attrs" v-on="$listeners">
    <template #text>
      Changed your credit
      <template v-if="prevRoles">from <roles-List :roles="prevRoles" /></template>
      to <roles-list :roles="payload.roles" />
    </template>
  </notification>
</template>

<script>
import { notification } from '../create-notification';
import { albumRoute } from 'helpers/routing';

export default notification({
  name: 'EditCollaborator',
  computed: {
    prevRoles() {
      return this.payload.prevRoles;
    },
    payload() {
      return this.notification.payload;
    },
    route() {
      return albumRoute(this.notification.payload.album);
    }
  }
});
</script>
