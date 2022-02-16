<template>
  <verification-notification status="accepted" v-bind="attrs" v-on="$listeners">
    Artist claiming: <span class="c-overlay-1">Accepted</span>.
  </verification-notification>
</template>

<script>
import { notification } from '../../create-notification';

export default notification({
  name: 'ArtistClaimingApprove'
});
</script>
