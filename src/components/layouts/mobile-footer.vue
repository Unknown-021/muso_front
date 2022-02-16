<template>
   <aside class="mobile-footer">
    <horizontal-line class="mobile-footer__border" />
    <div class="mobile-footer__inner">
      <p class="mobile-footer__title">Start capturing your credits today for free</p>
      <app-download-links class="mobile-footer__links" />
    </div>
  </aside>
</template>

<script>
import AppDownloadLinks from 'components/ui/app-download-links.vue';
import HorizontalLine from 'components/ui/horizontal-line.vue';

export default {
  name: 'mobile-footer',
  components: {
    AppDownloadLinks,
    HorizontalLine
  }
}
</script>

<style lang="scss">
.mobile-footer {
  margin-top: 24px;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media (min-width: 768px) {
    display: none;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    padding: 62px 0;
    max-width: 300px;
  }
  &__title {
    max-width: 11em;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.4;
    color: #FFF;
  }
  &__links {
    margin-top: 39px;
  }
}
</style>