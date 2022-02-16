const DEFAULT_LIMIT = 20;

export class Pagination {
  constructor({ limit = DEFAULT_LIMIT, getData }) {
    this.limit = limit;
    this.page = 1;
    this.dataCount = 0;
    this.totalCount = 0;
    this.getData = getData;
    this.loading = false;

    this.nextPage = this.nextPage.bind(this);
    this.reset = this.reset.bind(this);
  }

  get params() {
    return {
      offset: (this.page - 1) * this.limit,
      limit: this.limit
    };
  }

  get leftCount() {
    return this.totalCount - this.dataCount;
  }

  get skeletonCount() {
    return Math.min(this.leftCount, this.limit) || this.limit;
  }

  get noDataLeft() {
    return !this.loading && this.dataCount === this.totalCount;
  }

  async nextPage() {
    try {
      this.loading = true;
      const { data, totalCount } = await this.getData(this);
      this.dataCount += data.length || data.items.length;
      this.totalCount = totalCount;
      ++this.page;
    } catch (error) {
      this.$handleError(error);
    } finally {
      this.loading = false;
    }
  }

  reset() {
    this.page = 1;
    this.dataCount = 0;
    this.totalCount = 0;
  }
}

export function paginated({ data }) {
  return {
    data: data.data || data.list || data || data.items,
    totalCount: data.totalCount,
    percentage: data.percentage,
    currentValue: data.currentValue,
    prevValue: data.prevValue
  };
}

export function mergeParams(params, pagination) {
  return {
    ...params,
    ...pagination.params
  };
}
