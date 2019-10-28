import { computed } from '@ember/object';
import { IndexRouteUnauthenticated } from 'alpha-amber/routes/application/index';

export default IndexRouteUnauthenticated.extend({
  canAccess() {
    return this.can('show photo-albums');
  },
  modelName: 'photo',

  model() {
    return this.modelFor('photo-albums.photo-album');
  },

  title: computed('controller.model.title', function() {
    return this.get('controller.model.title');
  }),

  pageActions: computed('controller.model.title', function() {
    return [
      {
        link: 'photo-albums.photo-album.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.get('controller.model.photoAlbum'),
        canAccess: this.can('edit photo-albums')
      },
      {
        link: 'photo-albums.photo-album.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.get('controller.model.photoAlbum'),
        canAccess: this.can('destroy photo-albums')
      }
    ];
  })
});
