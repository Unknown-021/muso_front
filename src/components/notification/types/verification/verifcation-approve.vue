<template>
  <verification-notification status="accepted" v-bind="attrs" v-on="$listeners">
    <p>You have succesfully passed <span class="c-overlay-1">Legal Verification</span>.</p>
  </verification-notification>
</template>

<script>
import { notification } from '../../create-notification';

export default notification({
  name: 'VerificationApprove'
});
</script>