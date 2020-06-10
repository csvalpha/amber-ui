export default {
  name: 'service-inject',

  initialize(application) {
    // Always inject can, we need it quite often
    application.inject('route', 'can', 'service:can');
  }
};
