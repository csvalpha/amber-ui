import NewController from 'amber-ui/controllers/application/new';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { inject as service } from '@ember/service';

export default class NewPhotoAlbumController extends NewController {
  @service store;
  @service session;
  @service abilities;

  successTransitionTarget = 'photo-albums.photo-album.edit';
  cancelTransitionTarget = 'photo-albums.index';

  get groups() {
    if (this.abilities.can('select all groups for photo-albums')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  }
}
