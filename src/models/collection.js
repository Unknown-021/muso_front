import Api from 'services/api';

// TODO: Replace this old model with new one on the project page
export default {
  getDetails(id) {
    return Api.get(`album/${id}`);
  },
  getSongs(id) {
    return Api.get(`album/${id}/songs`);
  },
  getPDF(id, data) {
    return Api.get(`album/${id}/pdf`, data);
  },
  downloadPDF(id, data) {
    return Api.get({
      url: `album/${id}/pdf/download`,
      responseType: 'blob',
    }, data);
  }
};

export class AlbumModel {
  constructor({ http }) {
    this.http = http;
  }
  getTop() {
    return this.http.get('/albums/top');
  }
  getDetails(id) {
    return this.http.get(`/album/${id}`);
  }
  getSongs(id) {
    return this.http.get(`/album/${id}/songs`);
  }
  getCredits(id) {
    return this.http.get(`/album/${id}/credits`);
  }
  getPDF(id, params) {
    return this.http.get(`/album/${id}/pdf`, { params });
  }
  downloadPDF(id, params) {
    return this.http.get({
      url: `/album/${id}/pdf/download`,
      responseType: 'blob',
      params
    });
  }
}
