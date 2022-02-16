const https = require('https');
const express = require('express');
const path = require('path');
const fs = require('fs');
const contentSecurityPolicy = require('./src/middlewares/csp');
const bodyParser = require('body-parser');
const config = require('./src/config');
const { ServerCookie } = require('./src/libs/server-cookie');
const { createBundleRenderer } = require('vue-server-renderer');
const setupDevServer = require('./webpack/setup-dev-server');
const { APP_NAME } = require('./webpack/webpack.constants');

const port = 3000;
const httpsPort = 443;
const app = express();

const createRenderer = (bundle) =>
  createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync('./index.html', 'utf-8')
  });

// you may want to serve static files with nginx or CDN in production
app.use('/public', express.static(path.resolve(__dirname, './dist')));
app.use('/public', express.static(path.resolve(__dirname, './src/assets')));
app.use('/.well-known', express.static(path.resolve(__dirname, './certificates/stripe')))
app.use('/', express.static(path.resolve(__dirname, './src/assets')));

if (process.env.NODE_ENV === 'development') {
  app.use('/landing-search', (req, res) => {
    res.sendFile(path.resolve(__dirname, './landing-search.html'));
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(contentSecurityPolicy.nonce);
app.use(contentSecurityPolicy.directives);

let renderer;
if (process.env.NODE_ENV === 'development') {
  setupDevServer(app, (serverBundle) => {
    renderer = createRenderer(serverBundle);
  });
} else {
  renderer = createRenderer(require('./dist/vue-ssr-server-bundle.json'));
}

app.post('/auth/apple', handleAppRequest);
app.get('*', handleAppRequest);

async function handleAppRequest(req, res) {
  const host = config.bases.host;
  const context = {
    req,
    url: req.url,
    origin: `https://${host}`,
    api: config.bases.api,
    host,
    cookie: new ServerCookie(req, res),
    nonce: res.app.locals.nonce,
    userLanguages: req.acceptsLanguages(),
    // TODO: replace usage of "host" with process.env.NODE_ENV
    // so we can do: process.env.NODE_ENV === 'production'
    isInjectAnalytics: host === 'credits.muso.ai' || host === 'staging.muso.ai',
    appName: APP_NAME
  }

  try {
    const html = await renderer.renderToString(context);
    res.end(html);
  } catch (error) {
    console.log('=========', error);
    if (error.url) {
      res.redirect(error.code || 302, error.url);
    } else if (error.code === 404) {
      res.status(404).send('404 | Page Not Found');
    } else if (error.code === 400) {
      res.status(400).send(`400 | ${error.message || 'Bad request'}`);
    } else {
      res.status(500).send('500 | Internal Server Error');
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const { SNICallback } = require('./src/services/https-server');
  const httpsServer = https.createServer({ SNICallback }, app);
  httpsServer.listen(httpsPort, () => console.log(`https server is running on port ${httpsPort}`));
}

app.listen(port, () => console.log(`Listening on: ${port}`));