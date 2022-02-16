<template>
  <div class="main-layout">
    <div class="header-wrapper">
      <main-header class="main-header" :data-mobile-hidden="!isShowAppHeaderOnMobile" />
    </div>
    <!-- <notifications-panel v-if="isUserLoggedIn" class="main-layout__notifs" /> -->
    <div class="main-container">
      <portal-target name="scrollbar-overlap" />
      <div
        ref="scrollWrapper"
        class="scroll-wrapper"
        id="main-scroll-wrapper"
      >
        <page-background v-if="pageBackground" :name="pageBackground" />
        <transition v-bind="transitionProps" @after-leave="resetScrollPosition">
          <router-view :key="isCachedRoute ? undefined : $route.path" :class="routerViewClass" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from 'components/layouts/main-header';
import NotificationsPanel from 'components/notification/notifications-panel.vue';
import PageBackground from 'components/ui/page-background.vue';
import { PortalTarget } from 'portal-vue';
import { resetScrollPosition } from 'helpers/dom';

export default {
  name: 'main-layout',
  components: {
    MainHeader,
    PageBackground,
    NotificationsPanel,
    PortalTarget
  },
  watch: {
    $route(to, from) {
      if (to.path === from.path) {
        this.resetScrollPosition();
      }
    }
  },
  computed: {
    isCachedRoute() {
      return this.$route.matched.some(item => item.meta.cache);
    },
    isUserLoggedIn() {
      return this.$store.getters['auth/isUserLoggedIn'];
    },
    isShowAppHeaderOnMobile() {
      return this.$route.matched.every(item => item.meta.showAppHeaderOnMobile !== false);
    },
    transitionProps() {
      return {
        name: 'fade-fast',
        mode: 'out-in'
      };
    },
    isNeedToShowMainContentClass() {
      return this.$route.matched.every((item) => {
        return item.meta.mainContentClass !== false;
      });
    },
    routerViewClass() {
      return this.isNeedToShowMainContentClass ? 'main-content' : undefined;
    },
    pageBackground() {
      const route = this.$route.matched.find(item => item.meta.background);
      return route?.meta.background;
    }
  },
  methods: {
    resetScrollPosition() {
      resetScrollPosition(this.$refs.scrollWrapper);
    }
  }
};
</script>

<style lang="scss">
.scroll-wrapper {
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  // Help to fix performance issue with scrolling caused by blurred background image
  will-change: transform, opacity;
  &[data-partly-responsive=true] {
    overflow-x: auto;
  }

  /** Scrollbar - Firefox */
  scrollbar-width: auto;
  scrollbar-color: #21201f transparent;

  /** Scrollbar - Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #21201f;
  }
}
.main-layout {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow: hidden;
  &__sidenav {
    order: -1;
  }
}
.main-container {
  flex-grow: 1;
  height: 0;
  overflow: hidden;
  display: flex;
  position: relative;
}
.main-content {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 16px 25px 16px;
  position: relative;
  @media (min-width: 768px) {
    padding: 0 30px;
  }
}
.header-wrapper {
  background: #171615;
  width: 100%;
}
.main-header {
  width: 1180px;
  z-index: 999;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .scroll-wrapper {
    /** Scrollbar - Firefox */
    scrollbar-width: none;

    /** Scrollbar - Chrome/Edge/Safari */
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
