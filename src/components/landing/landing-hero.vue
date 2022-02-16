<template>
  <div class="landing-hero">
    <div class="header">
      <div class="header-container__nav">
        <a href="/" class="header-container__logo-wrap pointer" aria-lable="Landing page">
          <img class="header-logo" src="images/logo-text-right.svg" width="140" height="26" alt="Muso.AI logo" />
        </a>
        <div class="header-container__separator h-line" />
        <header-nav />
      </div>
      
      <div class="header-buttons">
        <!-- <router-link to="/login" class="nav-link">Log In</router-link> -->
        <a class="accent-link tablet-none" v-bind="downloadProps">Download</a>
        <action-button class="mobile-none" component="a" variant="primary" v-bind="downloadProps">
          Download App
        </action-button>
      </div>
    </div>
    <div class="hero-content">
      <h1 class="d-none d-md-block">Music Credits. Verified.</h1>
      <h1 class="d-inline d-md-none">Music Credits. <br /> Verified.</h1>
      <p class="d-none d-md-block">Discover over a 100 million music credits on the world's first verified credit</p>
      <p class="d-none d-md-block">platform for music professionals.</p>
      <p class="d-block d-md-none">Discover over a 100 million music credits on the world's first verified credit platform for music professionals.</p>
      <div class="search-box-container">
        <search-box class="search-box" :searchMobileWhileTyping="false" :showSearchBoxMobile="true"/>
        <a class="link contact-link d-none d-md-block" href="mailto:support@muso.ai">Contact us</a>
        <a class="link contact-link d-block d-md-none" href="mailto:support@muso.ai">Contact</a>
      </div>
    </div>
  </div>
</template>

<script>
import SEO from 'seo';
import SearchBox from 'components/ui/shared/search-box';
import HeaderNav from 'components/layouts/header-nav.vue';
import ActionButton from 'components/ui/action-button.vue';

export default {
  name: 'landing-hero',
  components: {
    SearchBox,
    HeaderNav,
    ActionButton
  },
  computed: {
    downloadProps() {
      return {
        target: '_blank',
        href: SEO.mobileAppUrl
      };
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.header-buttons {
  --buttons-gap: 12px;
  display: flex;
  align-items: baseline;
  margin-right: calc(-1 * var(--buttons-gap));
  --action-button-plain-color: #F7F7F7;
  --action-button-min-width: 96px;
  @media #{$before-phone} {
    font-size: 13px;
  }
  > * {
    margin-right: var(--buttons-gap);
    @media #{$tablet} {
      --buttons-gap: 38px;
    }
  }
}
</style>

<style lang="scss" scoped>
.landing-hero {
  height: 520px;
  padding: 20px 40px;
  width: 100%;
  background-color: #59585708;
  background-repeat: no-repeat;
  background-image: linear-gradient(0.03deg, #040302 13%, rgba(0,0,0,0) 99.97%), url('images/landing-background.jpg');
  background-position: 50% 0;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 20px;
  padding: 0 20px;
}
.hero-content {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & h1 {
    font-weight: bold;
    font-size: 80px;
    line-height: 100%;
    margin-bottom: 20px;
  }
  & p {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #ccc;
  }
  & .search-box-container {
    text-align: right;
    margin-top: 30px;
    width: 100%;
    @media (min-width: 768px) {
      max-width: 530px;
    }
    @media screen and (max-width: 768px) {
      text-align: left;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
.contact-link {
  margin-top: 10px;
  align-self: flex-start;
  color: #6BE7C8;
  &::after {
    @media (max-width: 767px) {
      content: '';
      margin-left: 2px;
      width: 8px;
      height: 8px;
      background-image: url(images/icons/green-arrow-right.svg);
      background-size: cover;
      display: inline-block;
    }
  }
  @media (min-width: 768px) {
    align-self: flex-start;
  }
}

@media (min-width: 768px) and (max-width: 1280px) {
  .hero-content {
    & h1 {
      font-weight: bold;
      font-size: 50px;
      line-height: 120%;
    }
  }
}

@media screen and (max-width: 768px) {
  .header {
      padding: 0 16px;
  }
  .landing-hero {
      padding: 80px 16px 40px 16px;
      height: auto;
  }
  .hero-content {
      text-align: left;
      align-items: flex-start;
      & h1 {
          font-weight: 600;
          font-size: 40px;
          line-height: 110%;
      }
      & p {
          font-weight: normal;
          font-size: 18px;
          line-height: 140%;
      }
  }
}
</style>