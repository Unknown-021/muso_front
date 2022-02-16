<template>
  <article class="album-info" @click="navigateIfCan">
    <img
      :src="album.avatarUrl || defaultImg"
      class="album-info__img album-info__img-wrap"
      :aria-hidden="!hasAvatar"
      :data-has-cover="hasAvatar"
    />
    <div class="album-info__content">
      <h3 class="album-info__title">
        <router-link :to="route" class="album-info__link">{{ album.title || '-' }}</router-link>
        <slot name="title-after" />
      </h3>
      <div class="album-info__text">
        <slot name="info" />
      </div>
    </div>
  </article>
</template>

<script>
import { isParentElementInteractive } from 'helpers/dom';
import { albumRoute } from 'helpers/routing';

const DEFAULT_IMAGE = '/images/default-avatars/project_default_square.png';

export default {
  name: 'album-info',
  props: {
    album: {
      type: Object,
      required: true
    },
    navigable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    defaultImg: () => DEFAULT_IMAGE,
    hasAvatar() {
      return Boolean(this.album.avatarUrl);
    },
    route() {
      return albumRoute(this.album);
    }
  },
  methods: {
    // public method
    getRoute() {
      return this.route;
    },
    navigateIfCan({ target }) {
      if (!this.navigable) return;
      if (isParentElementInteractive(target)) return;
      this.$router.push(this.route);
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/components/info.abstract";

:root {
  @include info-variables(album);
}

.album-info {
  @include info(album);
  &__text {
    --artist-link-color: currentColor;
  }
}
</style>