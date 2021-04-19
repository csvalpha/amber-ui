import { ApplicationRoute } from 'alpha-amber/routes/application/application';

export default class PhotoAlbumSubRoute extends ApplicationRoute {
  queryParams = {}
  get breadCrumb() {
    return { title: this.controller.model.title };
  }

  get pageActions() {
    return [
      {
        link: 'photo-comments.index',
        title: 'Bekijk fotoreacties',
        icon: 'comments',
        canAccess: this.can.can('show photo-comments')
      },
      {
        link: 'photo-albums.new',
        title: 'Nieuw foto-album',
        icon: 'plus',
        canAccess: this.can.can('create photo-albums')
      }
    ];
  }

  canAccess() {
    return this.can.can('show photo-albums');
  }

  model(params) {
    return this.store.findRecord('photo-album', params.photo_album_id, params);
  }
}
