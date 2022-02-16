const tls = require('tls');
const fs = require('fs');

const secureContext = {
  'localhost': tls.createSecureContext({
    key: fs.readFileSync('./certificates/localhost.key'),
    cert: fs.readFileSync('./certificates/localhost.crt')
  }),
  'muso.dev': tls.createSecureContext({
    key: fs.readFileSync('./certificates/muso-dev.key'),
    cert: fs.readFileSync('./certificates/muso-dev.crt')
  })
};

exports.SNICallback = (domain, cb) => {
  const context = secureContext[domain];
  if (context) {
    cb(null, context);
  } else {
    throw new Error('No keys/certificates for domain requested');
  }
};
