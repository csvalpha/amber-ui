import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('destroy mail-aliases');
  },
  modelName: 'mail-alias',
  title: 'Mail-alias verwijderen',
  parents: ['mail-aliases.index']
});
