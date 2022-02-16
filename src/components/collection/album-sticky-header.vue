<template>
  <sticky-header :shown="shown">
    <div class="sticky-header__top">
      <transition-with-delay name="sticky-slide-down">
        <breadcrumb
          v-show="shown"
          class="sticky-header__nav"
          data-animate
          data-enter-delay="100ms"
        />
      </transition-with-delay>
      <transition-with-delay name="sticky-slide-down">
        <album-cover
          v-show="shown && collection"
          :album="collection"
          class="sticky-header__avatar"
          data-enter-delay="150ms"
        />
      </transition-with-delay>
    </div>
  </sticky-header>
</template>

<script>
import TransitionWithDelay from 'components/utils/transition-with-delay';
import Breadcrumb from 'components/breadcrumb';
import StickyHeader from 'components/layouts/sticky-header.vue';
import AlbumCover from 'components/collection/album-cover.vue';

export default {
  name: 'album-sticky-header',
  components: {
    StickyHeader,
    Breadcrumb,
    AlbumCover,
    TransitionWithDelay
  },
  props: {
    collection: {
      type: Object,
      default: undefined
    },
    shown: {
      type: Boolean,
      default: false
    }
  }
};
</script>
