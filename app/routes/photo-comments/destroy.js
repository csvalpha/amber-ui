import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('destroy photo-comments');
  },
  modelName: 'photo-comment',
  title: 'Fotoreactie verwijderen',
  parents: ['photo-albums.index']
});
