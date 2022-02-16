<template>
  <div class="albums-nav-panel">
    <breadcrumb class="p-my-albums__breadcrumb" />
    <albums-side-nav class="p-my-albums__filters" :albums-results="albumsResults" />
  </div>
</template>

<script>
import Breadcrumb from 'components/breadcrumb';
import AlbumsSideNav from 'components/collection/albums-side-nav.vue';

export default {
  name: 'user-albums-nav-panel',
  components: {
    Breadcrumb,
    AlbumsSideNav
  },
  computed: {
    albumsResults() {
      return this.$store.getters['user/albums/albumsResult'];
    }
  }
}
</script>

<style lang="scss">
.albums-nav-panel {
  align-self: start;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 35px;
  flex-basis: 205px;
  height: 100%;
  width: 0;
}  
</style>