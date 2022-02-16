<template>
  <verification-notification status="rejected" v-bind="attrs" v-on="$listeners">
    <p>Legal verification: <span class="c-error">Rejected</span>.</p>
  </verification-notification>
</template>

<script>
import { notification } from '../../create-notification';

export default notification({
  name: 'VerificationReject'
});
</script>