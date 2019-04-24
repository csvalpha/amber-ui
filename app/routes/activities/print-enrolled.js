import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  skipBeforeModelAccessCheck: true,
  afterModel(activity, transition) {
    return this.checkAccessWithPromise(this.can('edit activity', activity), transition);
  },
  modelName: 'activity',
  title: 'Print inschrijvingen/streeplijst',
  parents: ['activities.show']
});
