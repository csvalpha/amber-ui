import { reads } from '@ember/object/computed';
import { ShowRouteUnauthenticated } from 'alpha-amber/routes/application/show';

export default ShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show photo-albums');
  },
  modelName: 'photo-album',
  modelRouteParam: 'photo_album_id',
  title: reads('controller.model.title')
});
