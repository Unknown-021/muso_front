import Api from 'services/api';

export default {
  getList(query) {
    return Api.get(`members`, query);
  },
};

export class MemberModel {
  constructor({ http }) {
    this.http = http;
  }
  getList(query) {
    return this.http.get('/members', query);
  }
};