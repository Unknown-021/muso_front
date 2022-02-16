<template>
  <div class="app-download-links">
    <a
      class="app-download app-download--ios"
      :href="seo.iosUrl"
      target="_blank"
      aria-label="Download Muso.AI mobile app in App Store"
    />
    <a
      class="app-download app-download--android"
      :href="seo.androidUrl"
      target="_blank"
      aria-label="Download Muso.AI mobile app in Google Play"
    />
  </div>
</template>

<script>
import SEO from "seo";

export default {
  name: 'app-download-links',
  computed: {
    seo() {
      return SEO;
    }
  }
}
</script>

<style lang="scss">
.app-download-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: -16px;
  margin-bottom: -12px;
  > * {
    margin-right: 16px;
    margin-bottom: 12px;
  }
}

.app-download {
  flex-shrink: 0;
  border: 1px solid rgba(247, 247, 247, 0.2);
  border-radius: 6px;
  width: 130px;
  height: 48px;
  display: block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 108px auto;
  &--ios {
    background-image: url("images/icons/app-store-link.svg");
  }
  &--android {
    background-image: url("images/icons/google-play-link.svg");
  }
}
</style>