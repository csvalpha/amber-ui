import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include(request) {
    if (request && request.url.indexOf('users/me') !== -1) {
      return ['permissions'];
    }
    return [];
  }
});
