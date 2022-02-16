import Api from 'services/api';
import { populateWithId } from '../store/modules/credits.utils';

export default {
  getTop() {
    return Api.get(`profiles/top`);
  },
  getDetails(id, data) {
    return Api.get(`profile/${id}`, data);
  },
  getParentAssociations(id) {
    return Api.get(`profile/${id}/parent-associations`);
  },
  getArtistAssociations(id) {
    return Api.get(`profile/${id}/artist-associations`);
  },
  getCredits(id, data) {
    return Api.get(`profile/${id}/credits`, data);
  },
  getPDF(id, data) {
    return Api.get(`profile/${id}/pdf`, data);
  },
  getSongsCollaborations(id, data) {
    return Api.get(`profile/${id}/songs-collaborators`, data);
  },
  downloadPDF(id, data) {
    return Api.get({
      url: `profile/${id}/pdf/download`,
      responseType: 'blob',
    }, data);
  }
};

export class ProfileModel {
  constructor({ http }) {
    this.http = http;
  }
  getTop() {
    return this.http.get(`/profiles/top`);
  }
  getDetails(id, params) {
    return this.http.get(`/profile/${id}`, { params });
  }
  getParentRoles(id) {
    return this.http.get(`/profile/${id}/parent-associations`);
  }
  async getCredits(id, params) {
    const response = await this.http.get(`/profile/${id}/credits`, { params });
    const data = populateWithId(response.data);
    return { data };
  }
  getArtists(params) {
    return this.http.get('/artists', { params });
  }
  getCollaborators(id, params) {
    return this.http.get(`/profile/${id}/collaborators`, { params });
  }
  getPDF(id, params) {
    return this.http.get(`/profile/${id}/pdf`, { params });
  }
  getSongsCollaborations(id, { params }) {
    return this.http.get(`/profile/${id}/songs-collaborators`, { params });
  }
  downloadPDF(id, data) {
    return this.http.get({
      url: `/profile/${id}/pdf/download`,
      responseType: 'blob',
    }, data);
  }
};
