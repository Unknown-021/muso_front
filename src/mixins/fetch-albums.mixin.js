import { Pagination } from 'helpers/pagination';

export function FetchAlbums(vm) {
  const self = {
    pagination: new Pagination({ limit: 20 }),
    isLoading: false,

    get allData() {
      return vm.$store.getters['artist/albums'];
    },
    get data() {
      // Removed unpublished albums
      return this.allData.filter(item => item.releaseDate);
    },
    get isNoMoreData() {
      return self.pagination.isNoMoreDataToLoad(this.allData);
    },

    async fetchData(id) {
      const { pagination } = self;      
      try {
        self.isLoading = true;
        await vm.$store.dispatch('artist/getAlbums', { id, pagination });
      } finally {
        self.isLoading = false;
      }
    }
  };

  return self;
};
