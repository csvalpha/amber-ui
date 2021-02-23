import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default class ArticlesIndexRoute extends ApplicationRoute.extend(RouteMixin) {
  get breadCrumb() {
    return { title: this.controller.model.title };
  }

  get pageActions() {
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
  }

  canAccess() {
    return this.can.can('show photo-albums');
  }

  model() {
    return this.modelFor('photo-albums.photo-album');
  }
}
