<template>
  <client-only>
    <mounting-portal mount-to="#page-background-image" :key="src" append target-slim>
      <transition name="page-bg-img">
        <div
          v-if="isImageReady"
          class="page-bg-img"
          :style="{
            'background-image': `url('${src}')`
          }"
        />
      </transition>
    </mounting-portal>
  </client-only>
</template>

<script>
import { MountingPortal } from 'portal-vue';
import ClientOnly from 'vue-client-only';

// Sometimes background image might be rendered twice for the same page
// in order to prevent this problem we always store link to the latest
// rendered background image component and manually call $destroy method
let lastVm = null;

export default {
  name: 'page-background-image',
  components: {
    MountingPortal,
    ClientOnly
  },
  props: {
    src: {
      type: String,
      default: true
    }
  },
  data() {
    return {
      isImageReady: false
    };
  },
  mounted() {
    if (lastVm) {
      lastVm.$destroy();
    }
    this.waitForImageLoading();
    lastVm = this;
  },
  methods: {
    async waitForImageLoading() {
      await loadImage(this.src);
      this.isImageReady = true;
    }
  },
  watch: {
    src(newSrc) {
      this.isImageReady = false;
      this.waitForImageLoading();
    }
  }
}

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.src = url;
    if (image.complete) {
      return resolve();
    }
    image.onload = resolve;
  });
}
</script>

<style lang="scss">
#page-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  @media (max-width: 767px) {
    display: none;
  }
}
.page-bg-img {
  position: absolute;
  top: 0;
  z-index: -1;
  left: 0;
  right: 0;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% auto;
  filter: blur(50px);
  opacity: 0.1;
  will-change: opacity;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 1280px) {
    // Right sidebar width = 335
    right: 335px;
  }

  &-enter-active {
    transition: opacity 150ms ease-in-out;
    transition-delay: 400ms;
  }
  &-enter {
    opacity: 0;
  }
}
</style>