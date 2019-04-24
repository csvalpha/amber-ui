/* jshint node:true */
const proxyPath = '/api';
const passthroughPaths = ['/ical', '/uploads', '/sidekiq', '/webdav'];

module.exports = function(app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  const proxy = require('http-proxy').createProxyServer({});

  proxy.on('error', (err, req, res) => {
    console.error(err, req.url);
    res.writeHead(503);
    res.end();
  });

  app.use(proxyPath, (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3000' });
  });

  app.use(passthroughPaths, (req, res) => {
    req.url = req.originalUrl;
    proxy.web(req, res, { target: 'http://localhost:3000' });
  });
};
