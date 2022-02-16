import { Pagination } from 'helpers/pagination';

export function FetchCollaborators(vm, module = 'profile') {
  const self = {
    pagination: new Pagination({ limit: 20 }),
    isLoading: false,

    get data() {
      return vm.$store.getters[`${module}/collaborators`];
    },
    get isNoMoreData() {
      return self.pagination.isNoMoreDataToLoad(this.data);
    },

    async fetchData(id) {
      try {
        self.isLoading = true;
        const { pagination } = self;
        await vm.$store.dispatch(`${module}/getCollaborators`, { id, pagination });
      } finally {
        self.isLoading = false;
      }
    }
  };

  return self;
};