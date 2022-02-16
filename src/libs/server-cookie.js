const cookie = require('cookie');

function ServerCookie(req, res) {
  const parsedCookie = cookie.parse(req.headers.cookie || '');

  return {
    get(name) {
      return parsedCookie[name];
    },
    set(name, value, options) {
      const cookiesArr = getCookiesArray(res);
      cookiesArr.push(cookie.serialize(name, value, options));
    },
    delete(name, options) {
      this.set(name, '', {
        ...options,
        maxAge: 0
      });
    }
  };
}

function getCookiesArray(res) {
  const currCookie = res.getHeader('set-cookie') || [];
  const cookies = Array.isArray(currCookie)
    ? currCookie
    : [currCookie];

  res.setHeader('Set-Cookie', cookies);

  return cookies;
}

exports.ServerCookie = ServerCookie;
