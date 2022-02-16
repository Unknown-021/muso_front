import axios from 'axios';
import config from 'config';

export function createHttp(baseURL = config.bases.api) {
  const http = axios.create({ baseURL });

  http.interceptors.response.use((response) => {
      return response.data;
    }, (error) => {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    });

  return http;
}

export function createHttpNext() {
  return createHttp(config.bases.apiNext);
}

export function initHttpRequestInterceptor(http, store) {
  http.interceptors.request.use(setAuthorizationHeaderIfCan);

  function setAuthorizationHeaderIfCan(config) {
    const token = store.state.auth.accessToken;
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  }
}

export function isOkStatus(status) {
  return status >= 200 && status < 400;
}

export function isError(status) {
  return !isOkStatus(status);
}

export function getHttpHeaderValue(header, value) {
  if (!header) return;

  const regexp = new RegExp("(?:^|; ?)" + value.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)");
  const matches = header.match(regexp);
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function contentDispositionFilename(headers, fallback) {
  return getHttpHeaderValue(headers.get('content-disposition'), 'filename') || fallback;
};
