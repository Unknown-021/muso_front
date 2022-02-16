<template>
  <song-info class="song-litem" ref="song" :song="item" navigable>
    <template #info>
      <artists-enumeration v-if="primaryArtists.length" :artists="primaryArtists" />
      <p class="ellipsis" v-else>{{ item.primaryArtist || '-' }}</p>
    </template>
  </song-info>
</template>

<script>
import SongInfo from './song-info.vue';
import ArtistsEnumeration from 'components/artist/artists-enumeration.vue';

export default {
  name: 'song-list-item',
  components: {
    SongInfo,
    ArtistsEnumeration
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    primaryArtists() {
      const { primaryArtists = [] } = this.item;
      return primaryArtists.length <= 1
        ? primaryArtists
        : primaryArtists.slice(0, 1)
    }
  },
  methods: {
    // public method
    getRoute() {
      return this.$refs.song.getRoute();
    }
  }
}
</script>

<style lang="scss">
.song-litem {
  cursor: pointer;
}
</style>
