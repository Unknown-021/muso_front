<template>
  <div class="congrats-card">
    <base-icon class="congrats-card__icon" name="success" width="90" height="60" />
    <p class="congrats-card__title">
      Congratulations!
    </p>
    <p class="congrats-card__subtitle">
      You are <pro-badge class="congrats-card__badge" /> !
    </p>
    <p class="congrats-card__content">
      Check your profile views, lifetime analtyics, all possible sources 
    </p>
    <apps-list :apps="apps" class="congrats-card__apps" />
    <brand-button
      class="congrats-card__start"
      component="router-link"
      :to="analyticsRoute"
      variant="primary"
    >
      Get Started
    </brand-button>
  </div>
</template>

<script>
import AppsList from 'components/ui/apps-list.vue';
import BrandButton from 'components/ui/brand-button';
import ProBadge from 'components/ui/pro-badge.vue';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

const apps = [
  'spotify',
  'apple-music',
  'amazon-music',
  'deezer',
  'tiktok',
  'youtube',
  'soundcloud',
  'shazam',
  'tidal',
  'itunes',
  'beatport'
];

export default {
  name: 'congrats-card',
  components: {
    AppsList,
    ProBadge,
    BaseIcon,
    BrandButton,
  },
  computed: {
    apps() {
      return apps;
    },
    analyticsRoute() {
      return { name: 'analytics' };
    }
  }
}
</script>

<style lang="scss">
.congrats-card {
  width: 500px;
  padding: 30px;
  margin: 0 auto;
  background: var(--base-2-color);
  text-align: center;
  border-radius: 8px;
  &__title {
    font-weight: 500;
    font-size: 44px;
    color: var(--overlay-5-color);
    margin-top: 20px;
    margin-bottom: 10px;
  }
  &__subtitle {
    font-weight: 500;
    font-size: 20px;
    color: var(--overlay-5-color);
  }
  &__badge {
    font-size: 18px;
  }
  &__content {
    width: 290px;
    color: var(--overlay-3-color);
    margin: 15px auto 15px auto;
  }
  &__apps {
    max-width: 100%;
    margin: 0 auto;
    --apps-list-column-gap: 10px;
  }
  &__icon {
    margin: 0 auto;
  }
  &__start {
    margin-top: 30px;
    display: block;
  }
}
</style>