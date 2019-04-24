import { computed } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import IndexRouteUnauthenticated from 'alpha-amber/routes/application/index';
import PagedModelRouteMixin from 'alpha-amber/mixins/paged-model-route-mixin';

export default IndexRouteUnauthenticated.extend(PagedModelRouteMixin, AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('show activities');
  },
  perPage: 15,
  modelName: 'activity',
  title: 'Activiteiten',

  queryParams: {
    search: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    },
    showPassed: {
      refreshModel: true
    }
  },

  pageActions: computed(function() {
    return [
      {
        link: 'activities.new',
        title: 'Nieuwe activiteit',
        icon: 'plus',
        canAccess: this.can('create activities')
      },
      {
        link: 'activities.ical',
        title: 'Ical link',
        icon: 'calendar',
        canAccess: this.can('show ical activities')
      }
    ];
  }),

  model(params) {
    params.paramMapping = this.get('paramMapping');
    if (!params.showPassed) {
      params.filter = { upcoming: true };
    }
    return this.findPaged(this.get('modelName'), params);
  }
});
