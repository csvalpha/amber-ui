import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import BreadcrumbsRouteMixin from 'alpha-amber/mixins/breadcrumbs-route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(
  CanMixin,
  AuthenticatedRouteMixin,
  AuthorizationRouteMixin,
  BreadcrumbsRouteMixin, {
    title: 'Contactsynchronisatie',

    canAccess() {
      return this.can('show webdav users');
    }
  }
);
