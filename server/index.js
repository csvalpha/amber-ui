'use strict';

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function (app) {
  const cors = require('cors');
  const globSync = require('glob').sync;
  const mocks = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  const proxies = globSync('./proxies/**/*.js', { cwd: __dirname }).map(
    require
  );

  // Use `sofiaUrl` only from env or Ember config (no hardcoded fallbacks).
  // Load Ember config function with the current environment if provided.
  const config = require('../config/environment')(
    process.env.EMBER_ENV || process.env.NODE_ENV
  );
  const sofiaUrl = process.env.SOFIA_URL || config.sofiaUrl;

  app.use(cors({ origin: sofiaUrl }));

  // Log proxy requests
  const morgan = require('morgan');
  app.use(morgan('dev'));

  mocks.forEach((route) => route(app));
  proxies.forEach((route) => route(app));
};
