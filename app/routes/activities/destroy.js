import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('destroy activities');
  },
  modelName: 'activity',
  title: 'Activiteit verwijderen',
  parents: ['activities.index']
});
