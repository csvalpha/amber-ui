// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { equal, reads } from '@ember/object/computed';
import EditController from 'alpha-amber/controllers/application/edit';
import { MailAliasModerationTypes } from 'alpha-amber/constants';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';

export default class EditMailAliasController extends EditController {
  successTransitionTarget = 'mail-aliases.show';

  _mailAliasModerationTypes(moderationType) {
    return {
      value: moderationType.toLowerCase(),
      label: moderationType,
    };
  }

  @equal('model.moderationType', 'open')
  moderationTypeOpen;

  @computed('store', function() {
    return this.store.findAll('group');
  })
  groups;

  @computed('store', function() {
    return this.store.findAll('user');
  })
  users;

  @reads('model.user.id')
  anyUser;

  @reads('model.group.id')
  anyGroup;

  @computed('_mailAliasModerationTypes', function() {
    return MailAliasModerationTypes.map(this._mailAliasModerationTypes);
  })
  mailAliasModerationTypes;
}
