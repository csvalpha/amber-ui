import NewController from 'amber-ui/controllers/application/new';
import { inject as service } from '@ember/service';

export default class PhotoAlbumsNewController extends NewController {
  @service abilities;
  @service session;
  @service store;

  successTransitionTarget = 'photo-albums.photo-album.edit';
  cancelTransitionTarget = 'photo-albums';

  get groups() {
    if (this.abilities.can('select all groups for photo-albums')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  }
}
