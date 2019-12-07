import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import RollbackModelOnDeactivationRouteMixin from 'alpha-amber/mixins/rollback-model-on-deactivation-route-mixin';
import { CanMixin } from 'ember-can';

export const EditRoute = Route.extend(
  CanMixin,
  AuthorizationRouteMixin,
  RollbackModelOnDeactivationRouteMixin,
  AuthenticatedRouteMixin, {
    modelName: null,
    modelRouteParam: 'id',
    pageActions: [],

    breadCrumb: computed('title', function() {
      return { title: this.title };
    }),

    model(params) {
      return this.store.findRecord(this.modelName, params[this.modelRouteParam], params);
    },

    setupController(controller, model) {
      this._super(controller, model);
      controller.set('pageActions', this.pageActions);
      controller.set('tabItems', this.tabItems);
    }
  }
);

export default EditRoute;
