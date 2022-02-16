<template>
  <header class="header-container">
    <div class="header-container__nav">
      <router-link to="/" class="header-container__logo-wrap pointer">
        <picture>
          <source srcset="images/MusoM.svg" media="(min-width: 768px) and (max-width: 999px)" />
          <img class="header-logo header-logo--adaptive" src="images/logo-text-right.svg" width="120" height="22" alt="Muso.AI logo" />
        </picture>
      </router-link>
    </div>

    <search-box class="header-container__search" :placeholder="searchPlaceholder" adaptive />

    <div class="header-container__after mobile-none">
      <header-nav :items="navItemsAfter">
        <template v-if="isUserLoggedIn">
          <!-- TODO: Migrate notifications to v3 API -->
          <!-- <notifications-button class="header-container__notifs" /> -->
          <div class="line" />
          <user-panel class="header-container__user" />
          
        </template>
        <template v-else>
          <action-button component="a" :href="downloadLink" target="_blank" variant="primary" class="header-container__download">
            Download App
          </action-button>
        </template>
      </header-nav>
    </div>
  </header>
</template>

<script>
import SEO from 'seo';
import SearchBox from 'components/ui/shared/search-box';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import ActionButton from 'components/ui/action-button.vue';
import HeaderNav from 'components/layouts/header-nav.vue';
import UserPanel from 'components/user/user-panel.vue';
import NotificationsButton from 'components/notification/notifications-button.vue';
export default {
  name: 'main-header',
  components: {
    SearchBox,
    PlainButton,
    ActionButton,
    UserPanel,
    NotificationsButton,
    HeaderNav
  },
  data() {
    return {
      // We store isUserLoggedIn value in data object instead computed property,
      // becuase it provides to user better UX. When we take computed property approach,
      // user panel will instantly disappear, before current page finish transition to login page
      isUserLoggedIn: this.$store.getters['auth/isUserLoggedIn'],
      isBeforeDesktop: false
    }
  },
  mounted() {
    this.$syncMediaWithComponent('(max-width: 1199px)', 'isBeforeDesktop');
  },
  computed: {
    searchPlaceholder() {
      return this.isBeforeDesktop ? 'Search' : undefined;
    },
    navItemsAfter() {
      if (this.isUserLoggedIn) {
        return [
          {
            text: 'Analytics',
            to: { name: 'analytics' }
          }
        ];
      } else {
        return [
          // {
          //   text: 'Login',
          //   to: { name: 'login' }
          // }
        ];
      }
    },
    downloadLink() {
      return SEO.mobileAppUrl;
    }
  }
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.nav-link{
  margin-right: 0;
}
.line{
  position: static;
  width: 1px;
  height: 24px;
  left: 336px;
  top: 14px;
  margin-right: 16px;
  border-right: 1px solid var(--overlay-4-color);
}
.header-container {
  display: flex;
  align-items: center;
  padding: 10px 0;
  height: 52px;
  width: 100%;
  background: #171615;
  @media #{$before-tablet} {
    padding: 10px 15px;
    background-color: #040302;
  }
  @media #{$tablet} {
    justify-content: space-between;
  }
  @media #{$tablet} and #{$before-desktop} {
    padding: 10px 25px;
  }
  &__nav {
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
      width: 0;
    }
  }
  &__separator {
    flex-shrink: 0;
    margin-left: 9px;
    margin-right: 9px;
    height: 16px;
    --vline-color: rgba(89, 88, 87, 0.7);
    @media #{$phone} {
      margin-left: 13px;
      margin-right: 11px;
    }
    @media #{$tablet} {
      margin-left: 16px;
      margin-right: 14px;
    }
  }
  &__search[class] {
    margin-left: auto;
    @media (min-width: 768px) {
      flex-grow: 1;
      margin-left: 16px;
      margin-right: auto;
      width: auto;
    }
    @media #{$tablet} {
      max-width: 300px;
    }
    @media (min-width: 1200px) {
      max-width: 300px;
    }
    @media (min-width: 1400px) {
      max-width: 300px;
    }
  }
  &__after {
    align-self: stretch;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-left: 25px;
  }
  &__download {
    @media #{$tablet} {
      margin-left: 13px;
    }
  }
  &__logo-wrap {
    flex-shrink: 0;
    display: inline-block;
    @media #{$phone} {
      margin-top: -2px;
    }
  }
}
.header-logo {
  display: block;
  width: 98px;
  height: auto;
  @media (min-width: 375px) {
    width: 120px;
  }
  &--adaptive {
    @media #{$tablet} and (max-width: 999px) {
      width: 30px;
    }
  }
}
</style>