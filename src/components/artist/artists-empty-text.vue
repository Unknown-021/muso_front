<template>
  <p>You have no verified artists on Muso.AI yet. <a class="text-link" :href="SEO.mobileAppUrl" target="_blank">Download</a> the app and claim your artist</p>
</template>

<script>
import SEO from 'seo';

export default {
  name: 'artists-empty-text',
  computed: {
    SEO: () => SEO
  }
}
</script>