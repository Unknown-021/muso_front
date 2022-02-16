<template>
  <div
    v-if="albums.length || loading"
    class="albums-grid"
    v-infinite-scroll="fetchAlbums"
    infinite-scroll-disabled="isInfiniteScrollDisabled"
    infinite-scroll-distance="200"
  >
    <collection-square
      v-for="item in albums"
      :key="item.id"
      :item="item"
      v-bind="albumsProps"
    >
      <template #dropdown>
        <slot name="album-dropdown" :album="item" />
      </template>
    </collection-square>

    <template v-if="loading">
      <collection-square-skeleton v-for="index in skeletonCount" :key="index" v-bind="albumsProps" />
    </template>
  </div>
  <div v-else>
    <slot name="empty" />
  </div>
</template>

<script>
import CollectionSquare from 'components/ui/collection/square';
import CollectionSquareSkeleton from 'components/ui/collection/square-skeleton';
import { updateSkeletonCount } from 'helpers/utils';
import { Pagination } from 'helpers/pagination';

export default {
  name: 'albums-grid',
  components: {
    CollectionSquare,
    CollectionSquareSkeleton
  },
  props: {
    albums: {
      type: Array,
      required: true
    },
    pagination: {
      type: Pagination,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    showArtist: {
      type: Boolean,
      default: false
    },
    fetchData: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      skeletonCount: this.pagination.limit
    };
  },
  watch: {
    albums(newData, oldData) {
      this.skeletonCount = updateSkeletonCount(newData, oldData, this.skeletonCount);
    }
  },
  computed: {
    isInfiniteScrollDisabled() {
      return this.loading || this.noMoreDataToLoad;
    },
    noMoreDataToLoad() {
      return this.pagination.isNoMoreDataToLoad(this.albums);
    },
    albumsProps() {
      return {
        showArtist: this.showArtist
      };
    }
  },
  methods: {
    async fetchAlbums() {
      await this.pagination.nextPage(this.fetchData);
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
