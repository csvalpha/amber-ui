'use strict';

module.exports = function (environment) {
  const deployTarget = process.env.DEPLOY_TARGET;

  let ENV = {
    modulePrefix: 'amber-ui',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      flashNoticeDefaultDuration: 2000,
    },

    historySupportMiddleware: true,
    maxFilesize: 8.5, // MB

    api: {
      hostname: '/api/v1',
    },

    'ember-moment': {
      allowEmpty: true,
    },

    showdown: {
      // text www.x.nl will render <p>text <a href="www.x.nl">www.x.nl</a></p>
      simplifiedAutoLink: true,

      // `# Foo` will render as <h3>Foo</h3>
      headerLevelStart: 2,

      // | h1    |    h2   |      h3 |
      // |:------|:-------:|--------:|
      // | 100   | [a][1]  | ![b][2] |
      tables: true,

      // ![foo](foo.jpg =100x80)
      parseImgDimensions: true,

      // Parses `\n` as <br>, without needing 2 spaces at the end
      simpleLineBreaks: true,

      // ~~strikethrough~~
      strikethrough: true,
    },

    // FontAwesome
    fontawesome: {
      // Regular icons as default
      defaultPrefix: 'fas',
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.clientId = '123456789';
    ENV.sofiaurl = 'http://localhost:5000';

    // Disable mirage in development
    ENV['ember-cli-mirage'] = {
      enabled: false,
      excludeFilesFromBuild: true,
    };

    // When true, log all access and permission lookups in the console.
    ENV.APP.LOG_ACCESS_CONTROL = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV.APP.flashNoticeDefaultDuration = 1;
  }

  ENV['@sentry/ember'] = {
    sentry: {
      dsn: 'https://invalid@sentry.io/12345', // invalid key, will be replaced when run as prod
      environment: deployTarget,
      release: process.env.BUILD_HASH,
    },
  };

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV['@sentry/ember'].sentry.dsn =
      'https://8936a95696f7453ab03e59264a7fede8@sentry.io/186017';
  }

  if (deployTarget === 'production') {
    ENV.clientId = 'IIeYVVbdNhiSiSCxKP5eUgS5Vs1-9ccZEvISdCVqe5g';
    ENV.googleAnalytics = { webPropertyId: 'G-8XNQMRFWPZ' };
    ENV.sofiaurl = 'https://streep.csvalpha.nl';
  }

  if (deployTarget === 'staging') {
    ENV.clientId = 'D0HhpORylbWUgOBwyR-0GGDcfsi9PG6zSNgctW--f-4';
    ENV.sofiaurl = 'https://stagingstreep.csvalpha.nl';
  }

  return ENV;
};
