import { ApplicationRoute } from 'amber-ui/routes/application/application';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';

export default class PhotoAlbumsRoute extends ApplicationRoute {
  @service intl;

  queryParams = {};

  get breadcrumb() {
    return {
      title: capitalize(this.intl.t('model.photoAlbum.name.other').toString()),
    };
  }
}
