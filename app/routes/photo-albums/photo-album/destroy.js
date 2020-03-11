import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('destroy photo-albums');
  },
  model() {
    return this.modelFor('photo-albums.photo-album');
  },
  modelName: 'photo-album',
  title: 'Foto-album verwijderen'
});
