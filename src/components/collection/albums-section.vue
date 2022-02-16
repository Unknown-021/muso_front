<template>
  <section>
    <h2 class="visually-hidden">Albums</h2>

    <albums-grid
      v-if="albums.length || loading"
      :albums="albums"
      :loading="loading"
      v-bind="$attrs"
    />

    <div v-else class="zero-state">
      <img class="zero-state__img" src="images/zero-state/half-circle.svg" width="100" height="100" />
      <p class="zero-state__text">No Albums On Muso.AI Yet</p>
    </div>
  </section>
</template>

<script>
import AlbumsGrid from './albums-grid.vue';

export default {
  name: 'albums-section',
  inheritAttrs: false,
  components: {
    AlbumsGrid
  },
  props: {
    albums: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.albums-grid {
  --albums-grid-min-width: 140px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--albums-grid-min-width), 1fr));
  grid-gap: 8px;
  @media (min-width: 400px) {
    --albums-grid-min-width: 170px;
  }
  > * {
    width: auto;
    max-width: 250px;
  }
  @media (min-width: 768px) {
    grid-gap: 11px;
  }
  @media (min-width: 1000px) {
    grid-gap: 17px;
  }
}
</style>
