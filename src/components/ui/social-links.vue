<template>
  <transition-group tag="div" name="links-slide-up" class="social-links">
    <template v-if="shown">
      <a
        v-for="(item, index) in links"
        :key="item.type"
        :style="`--index: ${index}`"
        class="social-icon"
        :href="item.link"
      >
        <component :is="item.type" />
      </a>
    </template>
  </transition-group>
</template>

<script>
import Facebook from "assets/images/icons/facebook_white.svg";
import Twitter from "assets/images/icons/twitter_white.svg";
import Instagram from "assets/images/icons/instagram_white.svg";
import Spotify from "assets/images/icons/spotify_white.svg";
import Website from "assets/images/icons/website_white.svg";

export default {
  name: 'social-links',
  components: {
    Facebook,
    Twitter,
    Instagram,
    Spotify,
    Website,
  },
  props: {
    links: {
      type: Array,
      required: true
    },
    shown: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
.social-links {
  display: flex;
  margin-right: -10px;
  > * {
    margin-right: 10px;
  }
}

.social-icon {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(39, 38, 37, 0.7);
  border-radius: 50%;
}

.links-slide-up {
  &-enter-active,
  &-leave-active {
    transition-property: transform, opacity;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(.2, .5, .1, 1);
    transition-delay: calc(50ms * (1 * var(--index)) + 150ms);
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(15px);
  }
}
</style>