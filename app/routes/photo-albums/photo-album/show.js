import { ShowRouteUnauthenticated } from 'alpha-amber/routes/application/show';

export default ShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show photo-albums');
  },
  modelName: 'photo-album',
  beforeModel() {
    this.transitionTo('photo-albums.photo-album.photos');
  }
});
