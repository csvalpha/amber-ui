import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { underscore } from '@ember/string';
import { inject as service } from '@ember/service';
import ENV from 'amber-ui/config/environment';

import { pluralize } from 'ember-inflector';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  host = ENV.api.hostname;
  coalesceFindRequests = true;

  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers.Authorization = `Bearer ${this.session.data.authenticated.access_token}`;
      document.documentElement.classList.add('authenticated');
    }

    return headers;
  }

  // See https://github.com/rails-api/active_model_serializers/blob/ce17a1b30540b09523ba3d6643b3ca19eca3f5bf/docs/integrations/ember-and-json-api.md#adapter-changes
  pathForType(type) {
    const underscored = underscore(type);
    return pluralize(underscored);
  }

  // Some internal query params should be mapped to other params for API requests
  query(store, type, query) {
    if (query.search) {
      if (!query.filter) {
        query.filter = {};
      }

      query.filter.search = query.search;
      delete query.search;
    }

    return super.query(store, type, query);
  }
}
