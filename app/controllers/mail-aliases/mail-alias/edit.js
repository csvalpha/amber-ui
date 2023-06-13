import EditController from 'amber-ui/controllers/application/edit';
import { MailAliasModerationTypes } from 'amber-ui/constants';

export default class MailAliasEditController extends EditController {
  successTransitionTarget = 'mail-aliases.mail-alias';

  _mailAliasModerationTypes(moderationType) {
    return {
      value: moderationType.toLowerCase(),
      label: moderationType,
    };
  }

  get moderationTypeOpen() {
    return this.model.moderationType === 'open';
  }

  get groups() {
    return this.store.findAll('group');
  }

  get users() {
    return this.store.findAll('user');
  }

  get anyUser() {
    return this.model.user.get('id');
  }

  get anyGroup() {
    return this.model.group.get('id');
  }

  get mailAliasModerationTypes() {
    return MailAliasModerationTypes.map(this._mailAliasModerationTypes);
  }
}
