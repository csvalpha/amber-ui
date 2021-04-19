import ApplicationAdapter from 'alpha-amber/adapters/application';

export default class UserAdapter extends ApplicationAdapter {
  urlForQuery(query) {
    let originalUrl = super.urlForQuery(...arguments);
    if (query.me) {
      delete query.me;
      return `${originalUrl}?filter[me]=true`;
    }

    return originalUrl;
  }
}
