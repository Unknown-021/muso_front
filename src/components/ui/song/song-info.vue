<template>
  <article class="song-info" @click="navigateToSong">
    <img
      class="song-info__img song-info__img-wrap"
      :src="song.avatarUrl || defaultImg"
      :aria-hidden="!hasCover"
      :data-has-cover="hasCover"
    />
    <div class="song-info__content">
      <h3 class="song-info__title">
        <router-link :to="songRoute" class="song-info__link">
          {{ song.title || '-' }}
        </router-link>
      </h3>
      <div class="song-info__text">
        <slot name="info" />
      </div>
    </div>
  </article>
</template>

<script>
import ArtistsEnumeration from 'components/artist/artists-enumeration.vue';
import { isParentElementInteractive } from 'helpers/dom';
import { songRoute } from 'helpers/routing';

const DEFAULT_COVER = '/images/default-avatars/project_default_square.png';

export default {
  name: 'song-info',
  components: {
    ArtistsEnumeration
  },
  props: {
    song: {
      type: Object,
      required: true
    },
    navigable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    defaultImg() {
      return DEFAULT_COVER;
    },
    hasCover() {
      return Boolean(this.song.avatarUrl);
    },
    songRoute() {
      return songRoute(this.song);
    }
  },
  methods: {
    // public method
    getRoute() {
      return this.songRoute;
    },
    navigateToSong(event) {
      if (!this.navigable) return;
      if (isParentElementInteractive(event.target)) return;

      this.$router.push(this.songRoute);
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/components/info.abstract";

:root {
  @include info-variables(song);
}

.song-info {
  @include info(song);
  &__text {
    --song-link-color: currentColor;
  }
}
</style>