export class Pagination {
  constructor({ limit }) {
    this.limit = limit;
    this.page = 1;
    this.isNavigating = false;
  }

  get query() {
    return {
      offset: (this.page - 1) * this.limit,
      limit: this.limit
    };
  }

  reset() {
    this.page = 1;
  }

  async nextPage(fetchData) {
    try {
      ++this.page;
      this.isNavigating = true;
      await fetchData(this.query);
    } catch (error) {
      --this.page;
      throw error;
    } finally {
      this.isNavigating = false;
    }
  }

  isNoMoreDataToLoad(data) {
    if (this.isNavigating) {
      return false;
    }

    return (data.length / this.limit) < this.page;
  }
}
