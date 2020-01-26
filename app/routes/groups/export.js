import { computed } from '@ember/object';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  skipBeforeModelAccessCheck: true,
  afterModel(group, transition) {
    return this.checkAccessWithPromise(this.can.can('export group', group), transition);
  },
  modelName: 'group',
  title: computed('controller.model.name', function() {
    return this.get('controller.model.name');
  }),
  parents: ['groups.index']
});
