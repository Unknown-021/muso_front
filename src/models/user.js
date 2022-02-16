export class UserModel {
  constructor({ http }) {
    this.http = http;
  }
  getProfile(data) {
    return this.http.get('/profile', data);
  }
};
