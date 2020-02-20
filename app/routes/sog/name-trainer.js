import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthorizationRouteMixin from 'alpha-amber/mixins/authorization-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, AuthorizationRouteMixin, {
  title: 'Namen leren',
  breadCrumb: { title: 'Namen leren' },
  queryParams: {
    group: {
      refreshModel: true
    },
    difficulty: {
      refreshModel: false
    }
  },
  canAccess() {
    return this.can.can('show sog/name-trainer');
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
  }
});
