export class SearchModel {
  constructor({ http }) {
  this.http = http;
  }
  searchAll(data) {
    return this.http.post(`/search`, { ...data, type: 'all' });
  }
  searchSongs(data) {
    return this.http.post(`/search`, { ...data, type: 'songs' });
  }
  searchArtists(data) {
    return this.http.post(`/search`, { ...data, type: 'artists' });
  }
  searchProfiles(data) {
    return this.http.post(`/search`, { ...data, type: 'profiles' });
  }
  searchCollections(data) {
    return this.http.post(`/search`, { ...data, type: 'collections' });
  }
};
