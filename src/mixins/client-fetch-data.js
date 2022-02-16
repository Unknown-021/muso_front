let isReady = false;

export function initClientFetchDataMixin() {
  isReady = true;
}

export const clientFetchData = {
  created() {
    if (!isReady) return;

    const { clientFetchData } = this.$options;
    if (!clientFetchData) return;

    const fn = typeof clientFetchData === 'string'
      ? this[clientFetchData]
      : clientFetchData;

    if (typeof fn === 'function') {
      this.$nextTick(fn.bind(this));
    }
  }
};
