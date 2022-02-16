import { populateWithId } from '../store/modules/credits.utils';

export class ArtistModel {
  constructor({ http }) {
    this.http = http;
  }

  getTop() {
    return this.http.get('/artists/top');
  }

  getDetails(id) {
    return this.http.get(`/artist/${id}`);
  }

  getAlbums(id, params) {
    return this.http.get(`/artist/${id}/albums`, { params });
  }

  getRoles(id) {
    return this.http.get(`/profile/${id}/artist-associations`);
  }

  async getCredits(id, params) {
    const response = await this.http.get(`/artist/${id}/credits`, { params });
    const data = populateWithId(response.data);
    return { data };
  }

  getCollaborators(id, params) {
    return this.http.get(`/artist/${id}/collaborators`, { params });
  }
};
