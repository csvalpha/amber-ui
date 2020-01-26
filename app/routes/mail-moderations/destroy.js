import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('destroy mail-moderations');
  },
  modelName: 'stored-mail',
  title: 'Moderatieverzoek negeren',
  parents: ['mail-moderations.index']
});
