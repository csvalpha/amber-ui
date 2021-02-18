import { reads } from '@ember/object/computed';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  skipBeforeModelAccessCheck: true,
  afterModel(group, transition) {
    return this.checkAccessWithPromise(this.can.can('export group', group), transition);
  },
  modelName: 'group',
  title: reads('controller.model.name'),
  parents: ['groups.index']
});
