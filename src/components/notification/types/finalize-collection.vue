<template>
  <notification data-type="album" v-bind="attrs" v-on="$listeners">
    <template #text>
      Your project was succesfully finalized and published.
    </template>
  </notification>
</template>

<script>
import { notification } from '../create-notification';
import { albumRoute } from 'helpers/routing';

export default notification({
  name: 'FinalizeCollection',
  computed: {
    route() {
      return albumRoute(this.notification.payload.collection);
    }
  }
});
</script>
