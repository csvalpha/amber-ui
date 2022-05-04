'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
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
      importBootstrapCSS: false,
    },

    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },

    babel: {
      sourceMaps: 'inline',
    },

    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      replaceExtensions: ['html', 'css', 'js', 'json'],
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('vendor/message-bus.js');
  app.import('vendor/shims.js');

  return app.toTree();
};
