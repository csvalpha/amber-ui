import { computed } from '@ember/object';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';

export default IndexRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show photo-albums');
  },
  modelName: 'photo',

  model() {
    return this.modelFor('photo-albums.photo-album');
  },

  title: computed.reads('controller.model.title'),

  pageActions: computed('can', 'controller.model.{photoAlbum,title}', function() {
    return [
      {
        link: 'photo-albums.photo-album.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.controller.model.photoAlbum,
        canAccess: this.can.can('edit photo-albums')
      },
      {
        link: 'photo-albums.photo-album.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model.photoAlbum,
        canAccess: this.can.can('destroy photo-albums')
      }
    ];
  })
});
