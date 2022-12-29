import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class PhotoAlbumSubRoute extends ApplicationRoute {
  queryParams = {};

  get breadcrumb() {
    return { title: this.controller.model.title };
  }

  get pageActions() {
    return [
      {
        link: 'photo-comments',
        title: 'Bekijk foto reacties',
        icon: 'comments',
        canAccess: this.abilities.can('show photo-comments'),
      },
      {
        link: 'photo-albums.new',
        title: 'Nieuw foto-album',
        icon: 'plus',
        canAccess: this.abilities.can('create photo-albums'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show photo-albums');
  }

  model(params) {
    return this.store.findRecord('photo-album', params.photo_album_id, params);
  }
}
