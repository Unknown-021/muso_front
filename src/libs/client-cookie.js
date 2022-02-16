import cookie from 'cookie';

export function ClientCookie() {
  const parsedCookie = cookie.parse(document.cookie);

  return {
    get(name) {
      return parsedCookie[name];
    },
    set(name, value, options) {
      parsedCookie[name] = value;
      document.cookie = cookie.serialize(name, value || '', options);
    },
    delete(name, options) {
      this.set(name, undefined, {
        ...options,
        maxAge: 0
      }); 
    }
  };
}
