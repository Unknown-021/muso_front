import { Pagination } from 'helpers/pagination';
import { tableColumnsDef } from 'helpers/table-columns';

const { releaseDateWithSorter } = tableColumnsDef;

export function FetchProfileCredits(vm, module = 'profile') {
  const self = {
    params: {
      sortKey: releaseDateWithSorter.sortKey,
      sortDirection: 'DESC',
      filter: undefined,
      keyword: undefined
    },
    pagination: new Pagination({ limit: 20 }),
    isLoading: false,

    get data() {
      return vm.$store.getters[`${module}/credits`];
    },
    get roles() {
      return vm.$store.getters[`${module}/roles`];
    },
    get isNoMoreData() {
      return self.pagination.isNoMoreDataToLoad(this.data);
    },

    async fetchRelatedData(id) {
      try {
        self.isLoading = true;
        await Promise.all([
          vm.$store.dispatch(`${module}/getRoles`, { id }),
          self.fetchData(id)
        ]);
      } finally {
        self.isLoading = false;
      }
    },

    async fetchData(id) {
      return vm.$store.dispatch(`${module}/getCredits`, {
        id,
        pagination: self.pagination,
        params: self.params
      });
    }
  };

  return self;
}
