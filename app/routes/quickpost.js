import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
export default Route.extend(AuthenticatedRouteMixin, AuthorizationRouteMixin, {
  title: 'Quickpost',

  breadCrumb: { title: 'Quickpost' },

  canAccess() {
    return this.can.can('show quickpost-messages');
  }
});
