'use strict';

module.exports = function(environment) {
  const policy = {
    'default-src': ['\'none\''],
    'script-src': ['\'self\'', 'www.google-analytics.com', 'www.googletagmanager.com'],
    'font-src': ['\'self\'', 'fonts.gstatic.com'],
    'connect-src': ['\'self\'', 'sentry.io'],
    'img-src': ['\'self\'', 'camo.csvalpha.nl', 'www.google-analytics.com', 'img.youtube.com'],
    'style-src': ['\'self\'', '\'unsafe-inline\'', 'fonts.googleapis.com/'],
    'media-src': ['\'self\''],
    'manifest-src': ['\'self\''],
    'object-src': ['\'self\''],
    'frame-src': ['\'self\'', 'www.youtube.com'],
    'worker-src': ['\'self\''],
    'base-uri': ['\'none\''],
    'form-action': ['\'self\''],
    'frame-ancestors': ['\'self\''],
    'block-all-mixed-content': []
  };

  if (environment === 'development' || environment === 'test') {
    policy['script-src'].push('\'unsafe-inline\'', '\'unsafe-eval\'');
  }

  if (environment === 'production') {
    policy['report-uri'] = ['https://sentry.io/api/186017/security/?sentry_key=5931cc6f635a4e6c96c8dcab4885485f'];
  }

  return {
    delivery: ['header'],
    enabled: true,
    failTests: true,
    policy,
    reportOnly: false
  };
};
