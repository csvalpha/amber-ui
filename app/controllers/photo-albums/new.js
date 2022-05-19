import NewController from 'amber-ui/controllers/application/new';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NewPhotoAlbumController extends NewController {
  @service store;
  @service session;
  @service abilities;

  successTransitionTarget = 'photo-albums.photo-album.edit';

  @computed('session.currentUser.{group,groups}', function () {
    const optionArray = [
      {
        label: '',
        value: null,
      },
    ];
    const groups = this.session.currentUser.group;
    groups.forEach((group) => {
      optionArray.push({
        label: group,
        value: group,
      });
    });
    return optionArray;
  })
  groupOptions;

  @computed('session.currentUser', 'store', function () {
    if (this.abilities.can('select all groups for photo-albums')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  })
  groups;
}
