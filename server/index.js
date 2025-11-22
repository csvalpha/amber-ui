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

  // Hardcoded allowed origins for CORS
  const allowedOrigins = new Set([
    'http://localhost:5000',
    'https://stagingstreep.csvalpha.nl',
    'https://streep.csvalpha.nl',
  ]);

  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.has(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    })
  );

  // Log proxy requests
  const morgan = require('morgan');
  app.use(morgan('dev'));

  mocks.forEach((route) => route(app));
  proxies.forEach((route) => route(app));
};
