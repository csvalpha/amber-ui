import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { underscore } from '@ember/string';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

import { pluralize } from 'ember-inflector';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.api.hostname,

  headers: computed('session.data.authenticated.access_token', 'session.isAuthenticated', function() {
    const headers = {};
    if (this.session.isAuthenticated) {
      headers.Authorization = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }),

  coalesceFindRequests: true,

  // See https://github.com/rails-api/active_model_serializers/blob/ce17a1b30540b09523ba3d6643b3ca19eca3f5bf/docs/integrations/ember-and-json-api.md#adapter-changes
  pathForType(type) {
    const underscored = underscore(type);
    return pluralize(underscored);
  },

  // Some internal query params should be mapped to other params for API requests
  paramMapping: {
    search: 'filter[search]'
  },

  query(store, type, query) {
    if (query.search) {
      if (!query.filter) {
        query.filter = {};
      }

      query.filter.search = query.search;
      delete query.search;
    }

    return this._super(store, type, query);
  }
});
