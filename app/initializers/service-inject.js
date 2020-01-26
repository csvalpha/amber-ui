export default {
  name: 'service-inject',

  initialize(application) {
    application.inject('route', 'can', 'service:can');
  }
};
