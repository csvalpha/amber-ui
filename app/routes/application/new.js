import Route from '@ember/routing/route';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import BreadcrumbsRouteMixin from 'alpha-amber/mixins/breadcrumbs-route-mixin';
import RollbackModelOnDeactivationRouteMixin from 'alpha-amber/mixins/rollback-model-on-deactivation-route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

export const NewRoute = Route.extend(
  CanMixin,
  AuthorizationRouteMixin,
  BreadcrumbsRouteMixin,
  RollbackModelOnDeactivationRouteMixin,
  AuthenticatedRouteMixin, {
    modelName: null,
    model() {
      return this.store.createRecord(this.modelName);
    },
    pageActions: [],
    setupController(controller, model) {
      this._super(controller, model);
      controller.set('pageActions', this.pageActions);
      controller.set('tabItems', this.tabItems);
    }
  }
);

export default NewRoute;
