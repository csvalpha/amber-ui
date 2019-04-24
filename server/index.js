/* jshint node:true */

module.exports = function(app) {
  const globSync = require('glob').sync;
  const morgan = require('morgan');

  const mocks = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  const proxies = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  app.use(morgan('dev'));

  mocks.forEach((route) => {
    route(app);
  });

  proxies.forEach((route) => {
    route(app);
  });
};
