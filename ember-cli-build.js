/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const nodeSass = require('node-sass');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    tests: process.env.EMBER_ENV === 'test',
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },

    emberCliDropzonejs: {
      includeDropzoneCss: false
    },

    'ember-bootstrap': {
      blacklist: ['bs-accordion', 'bs-carousel'],
      bootstrapVersion: 4,
      importBootstrapFont: false,
      importBootstrapCSS: false
    },

    sassOptions: {
      implementation: nodeSass
    }
  });

  app.import('vendor/message-bus.js');
  app.import('vendor/shims.js');

  return app.toTree();
};
