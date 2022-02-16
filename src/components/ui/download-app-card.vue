<template>
  <section class="download-app-card">
    <img class="download-app-card__logo" src="images/MusoM.svg" width="40" height="32" alt="Muso logo" />
    <h1 class="download-app-card__title">For a Better Experience Download our App</h1>
    <brand-button class="download-app-card__link" component="a" :href="mobileAppUrl">Download App</brand-button>
    <img class="visually-hidden" src="images/app-mockup-iphone@2x.png" alt="Artist profile in Muso app" />
    <div class="download-app-card__mockup" />
  </section>
</template>

<script>
import BrandButton from "components/ui/brand-button";
import SEO from "seo";

export default {
  name: 'download-app-card',
  components: {
    BrandButton
  },
  computed: {
    mobileAppUrl() {
      return SEO.mobileAppUrl;
    }
  }
}
</script>

<style lang="scss">
.download-app-card {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  padding: 110px 28px 0;
  text-align: center;
  &__title {
    margin-top: 16px;
    margin-bottom: 24px;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.2;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  &__link {
    margin-bottom: 37px;
    padding-left: 49px;
    padding-right: 49px;
  }
  &__mockup {
    flex-grow: 1;
    width: 264px;
    min-height: 317px;
    background: url('images/app-mockup-iphone@2x.png') no-repeat top/100%;
  }
}
</style>