import Route from '@ember/routing/route';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import BreadcrumbsRouteMixin from 'alpha-amber/mixins/breadcrumbs-route-mixin';
import { CanMixin } from 'ember-can';

export const IndexRouteUnauthenticated = Route.extend(
  CanMixin,
  AuthorizationRouteMixin,
  BreadcrumbsRouteMixin, {
    modelName: null,
    pageActions: [],

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
