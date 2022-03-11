/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    tests: process.env.EMBER_ENV === 'test',
    sourcemaps: {
      enabled: true,
      extensions: ['js'],
    },

    emberCliDropzonejs: {
      includeDropzoneCss: false,
    },

    'ember-bootstrap': {
      blacklist: ['bs-accordion', 'bs-carousel'],
      bootstrapVersion: 4,
      importBootstrapFont: false,
      importBootstrapCSS: false,
    },

    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },

    babel: {
      plugins: [require.resolve('@babel/plugin-proposal-optional-chaining')],
      sourceMaps: 'inline',
    },

    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      replaceExtensions: ['html', 'css', 'js', 'json'],
    },
  });

  app.import('vendor/message-bus.js');
  app.import('vendor/shims.js');

  return app.toTree();
};
