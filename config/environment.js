/* eslint-env node */
'use strict';

module.exports = function(environment) {
  const deployTarget = process.env.DEPLOY_TARGET;

  const ENV = {
    modulePrefix: 'alpha-amber',
    environment,
    rootURL: '/',
    api: {
      hostname: '/api/v1'
    },

    // See https://github.com/rwjblue/ember-cli-content-security-policy
    contentSecurityPolicyHeader: 'Content-Security-Policy',

    // See https://github.com/damiencaselli/ember-cli-sentry#content-security-policy
    // Keep this Content Security Policy in sync with nginx config
    contentSecurityPolicy: {
      'default-src': '\'none\'',
      'manifest-src': '\'self\'',
      'script-src': '\'self\' \'unsafe-inline\' \'unsafe-eval\' cdn.ravenjs.com www.google-analytics.com',
      'font-src': '\'self\' fonts.gstatic.com',
      'connect-src': '\'self\' sentry.io',
      'img-src': '\'self\' data: camo.csvalpha.nl sentry.io cdn.jsdelivr.net maps.googleapis.com cdn.ravenjs.com www.google-analytics.com youtube.com',
      'style-src': '\'self\' \'unsafe-inline\' fonts.googleapis.com/',
      'media-src': '\'self\' *.youtube.com *.youtube-nocookie.com',
      'object-src': '\'self\' *.youtube.com *.youtube-nocookie.com',
      'frame-src': '\'self\' *.youtube.com *.youtube-nocookie.com',
      'worker-src': '\'self\''
    },

    i18n: {
      defaultLocale: 'nl'
    },

    moment: {
      includeLocales: ['nl'],
      allowEmpty: true
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
      strikethrough: true
    },

    // FontAwesome
    fontawesome: {
      // Regular icons as default
      defaultPrefix: 'fas',
      icons: {
        'free-regular-svg-icons': [
          'smile',
          'square'
        ],
        'free-solid-svg-icons': [
          'angle-down',
          'arrow-down',
          'arrow-left',
          'arrow-right',
          'arrow-up',
          'beer',
          'bell',
          'bell-slash',
          'bold',
          'building',
          'calendar-alt',
          'check',
          'check-circle',
          'chevron-left',
          'chevron-right',
          'circle',
          'clock',
          'code',
          'coffee',
          'comments',
          'credit-card',
          'download',
          'edit',
          'envelope',
          'globe',
          'heading',
          'home',
          'image',
          'info-circle',
          'italic',
          'link',
          'list-ol',
          'list-ul',
          'lock',
          'magic',
          'map-marker',
          'money-bill',
          'newspaper',
          'pencil-alt',
          'phone',
          'plus',
          'question-circle',
          'quote-left',
          'search',
          'sign-in-alt',
          'sign-out-alt',
          'sort',
          'sort-amount-down',
          'sort-amount-up',
          'strikethrough',
          'times',
          'trash',
          'user',
          'users',
          'volume-up',
          'wrench'
        ],
        'free-brands-svg-icons': [
          'android',
          'apple',
          'facebook',
          'instagram',
          'windows',
          'youtube'
        ]
      }
    },

    locationType: 'router-scroll',
    historySupportMiddleware: true,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      flashNoticeDefaultDuration: 2000
    },

    sentry: {
      development: false
    },

    maxFilesize: 8.5 // MB
  };

  if (environment === 'development') {
    // Disable mirage in development
    ENV['ember-cli-mirage'] = {
      enabled: false,
      excludeFilesFromBuild: true
    };

    // Disable Sentry to prevent 'Error: Raven not configured' as no DSN is configured
    ENV.sentry.development = true;

    // When true, log all access and permission lookups in the console.
    ENV.APP.LOG_ACCESS_CONTROL = true;
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.contentSecurityPolicy['img-src'] += ' http://cdn.jsdelivr.net';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // Keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.sentry.development = true;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.flashNoticeDefaultDuration = 1;
  }

  if (deployTarget === 'staging') {
    ENV.sentry.dsn = 'https://5931cc6f635a4e6c96c8dcab4885485f@sentry.io/186023';
  }

  if (deployTarget === 'production') {
    ENV.sentry.dsn = 'https://8936a95696f7453ab03e59264a7fede8@sentry.io/186017';
    ENV.googleAnalytics = { webPropertyId: 'UA-8136462-4' };
  }

  return ENV;
};
