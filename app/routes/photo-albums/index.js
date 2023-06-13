import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class PhotoAlbumsIndexRoute extends ApplicationRoute {
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
        title: 'Nieuw fotoalbum',
        icon: 'plus',
        canAccess: this.abilities.can('create photo-albums'),
      },
    ];
  }

  model(params) {
    return this.store.queryPaged('photo-album', params);
  }
}
