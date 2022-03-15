'use strict';

const proxyPath = '/api';

module.exports = function (app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  let proxy = require('http-proxy').createProxyServer({});

  proxy.on('error', function (err, req) {
    console.error(err, req.url);
  });

  app.use(proxyPath, function (req, res) {
    proxy.web(req, res, { target: 'http://localhost:3000' });
  });
};
