<template>
  <album-info class="album-litem" ref="album" :album="item" navigable>
    <template #info>
      <artists-enumeration v-if="primaryArtists.length" :artists="primaryArtists" />
      <p v-else class="ellipsis">{{ item.primaryArtist || '-' }}</p>
    </template>
  </album-info>
</template>

<script>
import AlbumInfo from 'components/collection/album-info.vue';
import ArtistsEnumeration from 'components/artist/artists-enumeration.vue';

export default {
  name: 'album-list-item',
  components: {
    AlbumInfo,
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
        : primaryArtists.slice(0, 1);
    }
  },
  methods: {
    // public method
    getRoute() {
      return this.$refs.album.getRoute();
    }
  }
}
</script>

<style lang="scss">
.album-litem {
  cursor: pointer;
}
</style>
