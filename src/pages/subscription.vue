<template>
  <div class="subs-page">
    <div class="bg-image-3" />

    <transition name="fade-fast" mode="out-in">
      <router-view :class="routeClass" class="subs-page__content" />
    </transition>
  </div>
</template>

<script>
const routeClassMap = {
  'shopping-success': 'subs-page__success'
};

export default {
  name: 'subscription-page',
  computed: {
    routeClass() {
      return routeClassMap[this.$route.name];
    }
  }
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.subs-page {
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  padding-bottom: 60px;
  min-height: 100%;
  @media #{$tablet} {
    padding-top: 25px;
    padding-bottom: 25px;
  }
  &__content {
    position: relative;
  }
  &__success[class] {
    margin-top: 103px;
  }
}
</style>
