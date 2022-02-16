<template>
  <notification data-type="user" route="/analytics/" v-bind="attrs" v-on="$listeners">
    <template #text>
      <p>Your analytics are ready!</p>
      <span class="c-overlay-1">We have updated your account with fresh analytics for all your credits.</span>
    </template>
  </notification>
</template>

<script>
import { notification } from '../create-notification';

export default notification({
  name: 'ProUsersAnalytics'
});
</script>
