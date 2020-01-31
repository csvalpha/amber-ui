import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';
import { all } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, AuthorizationRouteMixin, {
  title: 'Namen trainer',
  breadCrumb: { title: 'Namen trainer' },
  queryParams: {
    group: {
      refreshModel: true
    },
    difficulty: {
      refreshModel: false
    }
  },
  canAccess() {
    return this.can.can('show groups');
  },
  model(params) {
    if (params.group == null) {
      return this.store.findAll('group');
    } else {
      return this.store.query('membership', {
        filter: {
          group: params.group,
          active: true
        }
      });
    }
  },
});
