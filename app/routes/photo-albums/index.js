import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';

export default class ArticlesIndexRoute extends ApplicationRoute {
  @service intl;

  get breadCrumb() {
    return {
      title: capitalize(this.intl.t('model.photoAlbum.name.other').toString()),
    };
  }

  get pageActions() {
    return [
      {
        link: 'photo-comments.index',
        title: 'Bekijk fotoreacties',
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
    return this.store.queryPaged('photo-album', params);
  }
}
