import { Pagination } from 'helpers/pagination';

export function FetchUserAlbums(vm) {
  const self = {
    pagination: new Pagination({ limit: 30 }),
    isLoading: false,

    get results() {
      return vm.$store.getters['user/albums/albumsResult'];
    },
    get data() {
      return this.results?.list || [];
    },
    get isNoMoreData() {
      return self.pagination.isNoMoreDataToLoad(this.data);
    },

    async fetchData(query = {}, params = {}) {
      const requestPayload = {
        query: {
          ...self.pagination.query,
          ...query
        },
        ...params
      };
      const action = self.pagination.page > 1
        ? 'user/albums/getMoreAlbums'
        : 'user/albums/getAlbums';
      
      try {
        self.isLoading = true;
        await vm.$store.dispatch(action, requestPayload);
      } finally {
        self.isLoading = false;
      }
    },
    
    fetchUnreleased(params = {}) {
      return self.fetchData({
        isPublished: false,
        sortKey: 'createdAt',
        sortDirection: 'DESC'
      }, params);
    },

    clearData() {
      vm.$store.commit('user/albums/clearAlbums');
    }
  };

  return self;
};
