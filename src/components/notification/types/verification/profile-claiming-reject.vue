<template>
  <verification-notification status="rejected" v-bind="attrs" v-on="$listeners">
    Profile claiming: <span class="c-error">Rejected</span>.
  </verification-notification>
</template>

<script>
import { notification } from '../../create-notification';

export default notification({
  name: 'ProfileClaimingReject'
});
</script>