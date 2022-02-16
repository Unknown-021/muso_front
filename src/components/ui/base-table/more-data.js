export class MoreData {
  constructor() {
    this.isLoading = false;
  }

  loading() {
    this.isLoading = true;
  }

  loaded() {
    this.isLoading = false;
  }
}
