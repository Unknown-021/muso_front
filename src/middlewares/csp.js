const crypto = require('crypto');
const contentSecurityPolicy = require('helmet-csp');
const config = require('../config');

const IS_DEV = process.env.NODE_ENV === 'development';

exports.nonce = (req, res, next) => {
  res.app.locals.nonce = crypto.randomBytes(16).toString('hex');
  next();
};

exports.directives = (req, res, next) => {
  // IMPORTANT: never set 'unsafe-inline' for script-src, since there are
  // parts of web app where we display user provided content like in artist/profile biography modal
  const directives = {
    defaultSrc: ["'self'"],
    childSrc: ["'none'"],
    imgSrc: [
      '*',
      'https://www.google-analytics.com',
      'data:',
      'https://script.hotjar.com'
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com'
    ],
    fontSrc: [
      "'self'",
      'https://fonts.gstatic.com',
      'data:',
      'https://script.hotjar.com'
    ],
    scriptSrc: [
      "'self'",
      `'nonce-${res.app.locals.nonce}'`,
      'https://www.google-analytics.com',
      'https://ssl.google-analytics.com',
      'https://connect.facebook.net',
      'https://js.stripe.com',
      'https://www.paypal.com',
      'https://static.hotjar.com',
      'https://script.hotjar.com'
    ],
    connectSrc: [
      "'self'",
      config.bases.api,
      config.bases.apiNext,
      // TODO: Remove later
      'wss://api-nonproduction.muso.ai/',
      'https://api-nonproduction.muso.ai/',
      'https://www.google-analytics.com',
      'https://www.facebook.com/x/oauth/',
      'https://fonts.googleapis.com',
      'https://www.paypal.com/',
      'https://www.sandbox.paypal.com/',
      'https://*.hotjar.com:*',
      'https://vc.hotjar.io:*',
      'https://surveystats.hotjar.io',
      'wss://*.hotjar.com'
    ],
    frameSrc: [
      'https://player.vimeo.com',
      'https://js.stripe.com/',
      'https://www.paypal.com/',
      'https://www.sandbox.paypal.com/',
      'https://vars.hotjar.com'
    ]
  };
  if (IS_DEV) {
    // This one is needed for webpack hot module replacement during development
    directives.scriptSrc.push("'unsafe-eval'");
  }

  contentSecurityPolicy({ directives })(req, res, next);
};
