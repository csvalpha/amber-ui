import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('destroy photos');
  },
  modelName: 'photo',
  modelRouteParam: 'photo_id',
  title: 'Foto verwijderen',
  parents: ['photo-albums.photo-album.photos.index']
});
