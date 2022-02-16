<template>
  <base-modal v-bind="$attrs" v-on="$listeners">
    <div class="modal-body modal-text">
      <p>Muso.AI invites partners to help build the world's most trusted resource for credit data and music metadata. Our company is self-funded and self-sufficient in pushing forward with our mission. Partners are very carefully selected to ensure that our goals and values match for the sake of the music industry.</p>
      <p>For any investors and partners interested in working with us, please send an email to <a href="mailto:kyran@muso.ai">kyran@muso.ai</a>.</p>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';

export default {
  name: 'investors-modal',
  components: {
    BaseModal
  }
}
</script>