<template>
  <sticky-header :shown="shown">
    <div class="sticky-header__top">
      <transition-with-delay name="sticky-slide-down">
        <breadcrumb
          v-show="shown"
          class="sticky-header__nav"
          data-enter-delay="100ms"
        />
      </transition-with-delay>
      <transition-with-delay name="sticky-slide-down">
        <profile-avatar
          v-if="profile"
          v-show="shown"
          :profile="profile"
          class="sticky-header__avatar"
          data-enter-delay="150ms"
          avatar-size="small"
        />
      </transition-with-delay>
    </div>
    <social-links class="sticky-header__socials" :links="socialAccounts" :shown="shown" />
  </sticky-header>
</template>

<script>
import TransitionWithDelay from 'components/utils/transition-with-delay';
import Breadcrumb from 'components/breadcrumb';
import { ScrollScene } from 'helpers/scroll-scene';
import StickyHeader from 'components/layouts/sticky-header.vue';
import SocialLinks from 'components/ui/social-links.vue';
import ProfileAvatar from 'components/ui/profile/profile-avatar.vue';

export default {
  name: 'profile-sticky-header',
  components: {
    StickyHeader,
    Breadcrumb,
    ProfileAvatar,
    SocialLinks,
    TransitionWithDelay
  },
  props: {
    profile: {
      type: Object,
      default: undefined
    },
    shown: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    socialAccounts() {
      return this.$store.getters['socialAccount/socialAccounts'];
    }
  }
};
</script>

<style lang="scss">
</style>
