<template>
  <div>
    <p>You have no verified artists on Muso.AI yet. Download the app and claim your artist</p>
    <action-button
      class="artists-menu__download"
      component="a"
      :href="seo.mobileAppUrl"
      target="_blank"
      @click="$emit('download')"
    >Download App</action-button>
  </div>
</template>

<script>
import ActionButton from 'components/ui/action-button.vue';
import SEO from 'seo';

export default {
  name: 'artists-empty',
  components: {
    ActionButton
  },
  computed: {
    seo: () => SEO
  }
}
</script>