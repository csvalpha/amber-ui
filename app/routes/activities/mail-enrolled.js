import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  skipBeforeModelAccessCheck: true,
  afterModel(activity, transition) {
    return this.checkAccessWithPromise(this.can('mail enrolled members of activity', activity), transition);
  },
  model() {
    // For the permission check, the form needs to be loaded
    const activityPromise = this._super(...arguments);
    // Wait for activity, then for form and return the activity
    return activityPromise.then(activity => activity.get('form').then(() => activity));
  },
  modelName: 'activity',
  title: 'Mail ingeschrevenen',
  parents: ['activities.show']
});
