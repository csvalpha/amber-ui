import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('destroy static-pages');
  },
  modelName: 'static-page',
  title: 'Informatie pagina verwijderen',
  parents: ['static-pages.index']
});
