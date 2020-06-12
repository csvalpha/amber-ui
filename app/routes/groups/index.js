import { computed } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import IndexRouteUnauthenticated from 'alpha-amber/routes/application/index';

export default IndexRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('show groups');
  },
  queryParams: {
    search: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    },
    selectedGroupKind: {
      refreshModel: true
    },
    showAdministrative: {
      refreshModel: true
    },
    showInactive: {
      refreshModel: true
    }
  },
  modelName: 'group',
  title: 'Groepen',
  pageActions: computed('can', function() {
    return [
      {
        link: 'groups.new',
        title: 'Nieuwe groep',
        icon: 'plus',
        canAccess: this.can.can('create groups')
      }
    ];
  }),
  model(params) {
    if (!params.filter) {
      params.filter = {};
    }

    if (params.search) {
      params.filter.search = params.search;
    } else if (params.selectedGroupKind) {
      params.filter.kind = params.selectedGroupKind;
    }

    if (!params.showAdministrative) {
      params.filter.administrative = false;
    }

    if (!params.showInactive) {
      params.filter.active = true;
    }

    delete params.selectedGroupKind;
    delete params.showAdministrative;
    delete params.showInactive;
    delete params.search;
    return this.store.query(this.modelName, params);
  }
});
