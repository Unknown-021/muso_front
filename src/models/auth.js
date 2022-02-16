export class AuthModel {
  constructor({ http }) {
    this.http = http;
  }
  confirmEmail(data) {
    return this.http.post('/user/activation', data);
  }
  checkEmail(data) {
    return this.http.post('/user/check-email', data);
  }
  login(data) {
    return this.http.post('/user/login', data);
  }
  loginWithToken(data) {
    return this.http.post('/user/token/login', data);
  }
  loginWithFacebook(data) {
    return this.http.post('/user/fb/login', data);
  }
  loginWithApple(data) {
    return this.http.post('/user/apple/login', data);
  }
  forgotPassword(data) {
    return this.http.post('/user/forgot', data);
  }
  resetPassword(data) {
    return this.http.post('/user/recovery', data);
  }
};
