import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  skipBeforeModelAccessCheck: true,
  afterModel(user, transition) {
    return this.checkAccessWithPromise(this.can('destroy user', user), transition);
  },
  modelName: 'user',
  title: 'Lid verwijderen',
  parents: ['users.index']
});
