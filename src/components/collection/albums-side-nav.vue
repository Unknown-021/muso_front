<template>
  <side-nav :items="filteringItems" />
</template>

<script>
import SideNav from 'components/layouts/side-nav.vue';
import { createNumbersSorter, invertSorter } from 'helpers/sorters';

export const ARTIST_ID_KEY = 'artist_id';
export const ALBUM_TYPE_KEY = 'album_type';

const artistCountSorter = invertSorter(createNumbersSorter('count'));

export default {
  name: 'albums-side-nav',
  components: {
    SideNav
  },
  props: {
    albumsResults: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    filteringItems() {
      return [
        {
          title: 'Albums',
          children: [
            this.unreleasedAlbumsItem,
            this.releasedAlbumsItem,
          ]
        },
        {
          title: 'Artists',
          children: this.artistsNavItems
        }
      ]
        .filter(item => item.children.length);
    },
    unreleasedAlbumsItem() {
      return {
        title: 'Unreleased',
        route: this.filteringRoute(),
        count: this.albumsResults?.totalUnpublishedCount
      };
    },
    releasedAlbumsItem() {
      return {
        title: 'Released',
        route: this.filteringRoute({ [ALBUM_TYPE_KEY]: 'released' }),
        count: this.albumsResults?.totalPublishedCount
      };
    },
    artistsNavItems() {
      return this.albumsResults
        ? this.albumsResults.artists.map(this.mapArtistToNavItem).sort(artistCountSorter)
        : [];
    },
    filteringRoute() {
      const query = { ...this.$route.query };
      delete query[ARTIST_ID_KEY];
      delete query[ALBUM_TYPE_KEY];

      return (filterQuery) => ({
        path: this.$route.path,
        query: {
          ...query,
          ...filterQuery
        }
      });
    },
  },
  methods: {
    mapArtistToNavItem({ id, fullName, count }) {
      return {
        title: fullName,
        route: this.filteringRoute({ [ARTIST_ID_KEY]: id }),
        count
      };
    }
  }
}
</script>