import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import RollbackModelOnDeactivationRouteMixin from 'alpha-amber/mixins/rollback-model-on-deactivation-route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export const NewRoute = Route.extend(
  AuthorizationRouteMixin,
  RollbackModelOnDeactivationRouteMixin,
  AuthenticatedRouteMixin, {
    modelName: null,
    model() {
      return this.store.createRecord(this.modelName);
    },
    pageActions: [],

    breadCrumb: computed('title', function() {
      return { title: this.title };
    }),

    setupController(controller, model) {
      this._super(controller, model);
      controller.set('pageActions', this.pageActions);
      controller.set('tabItems', this.tabItems);
    }
  }
);

export default NewRoute;
