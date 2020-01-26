import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
export const IndexRouteUnauthenticated = Route.extend(
  AuthorizationRouteMixin, {
    modelName: null,
    pageActions: [],

    breadCrumb: computed('title', function() {
      return { title: this.title };
    }),

    queryParams: {
      search: {
        refreshModel: true
      },
      sort: {
        refreshModel: true
      }
    },

    setupController(controller, model) {
      this._super(controller, model);
      controller.set('pageActions', this.pageActions);
      controller.set('tabItems', this.tabItems);
    },

    model(params) {
      return this.store.query(this.modelName, params);
    }
  }
);

export default IndexRouteUnauthenticated;
