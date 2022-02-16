<template>
  <notification data-type="user" v-bind="attrs" v-on="$listeners">
    <template #text>
      <p>Email confirmation: <span class="c-overlay-1">Complete</span>.</p>
    </template>
  </notification>
</template>

<script>
import { notification } from '../create-notification';

export default notification({
  name: 'EmailConfirmed'
});
</script>
