import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, AuthenticatedRouteMixin, AuthorizationRouteMixin, {
  title: 'Quickpost',

  breadCrumb: { title: 'Quickpost' },

  canAccess() {
    return this.can('show quickpost-messages');
  }
});
