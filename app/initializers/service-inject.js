export default {
  name: 'service-inject',

  initialize(application) {
    // Always inject abilities, we need it quite often
    application.inject('route', 'abilities', 'service:abilities');

    // Always inject session in abilities
    application.inject('ability', 'session', 'service:session');
  }
};
