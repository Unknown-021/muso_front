<template>
  <base-menu class="artists-menu" :data-has-artists="String(hasArtists)">
    <template v-if="artists.length">
      <template v-for="item in artists">
        <slot name="item" :item="item" />
      </template>
    </template>

    <artists-empty v-else class="artists-menu__no-artists" @download="close" />
  </base-menu>
</template>

<script>
import BaseMenu from 'components/ui/base-menu/base-menu.vue';
import ArtistsEmpty from './artists-empty.vue';

export default {
  name: 'artist-menu',
  components: {
    BaseMenu,
    ArtistsEmpty
  },
  props: {
    artists: {
      type: Array,
      required: true
    }
  },
  computed: {
    hasArtists() {
      return this.artists.length !== 0;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
.artists-menu {
  width: 100%;
  max-width: 365px;
  &[data-has-artists=false] {
    max-width: 310px;
  }
  &__no-artists {
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
    color: #8F8F8F;
    > p {
      font-size: 12px;
      line-height: 1.3;
    }
  }
  &__download {
    margin-top: 11px;
  }
}
</style>