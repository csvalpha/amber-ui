import { computed } from '@ember/object';
import EditController from 'alpha-amber/controllers/application/edit';
import { MailAliasModerationTypes } from 'alpha-amber/constants';

export default EditController.extend({
  successTransitionTarget: 'mail-aliases.show',

  moderationTypeOpen: computed.equal('model.moderationType', 'open'),

  groups: computed('store', function() {
    return this.store.findAll('group');
  }),
  users: computed('store', function() {
    return this.store.findAll('user');
  }),

  anyUser: computed.reads('model.user.id'),

  anyGroup: computed.reads('model.group.id'),

  _mailAliasModerationTypes: moderationType => {
    return {
      value: moderationType.toLowerCase(),
      label: moderationType
    };
  },

  mailAliasModerationTypes: computed('_mailAliasModerationTypes', function() {
    return MailAliasModerationTypes.map(this._mailAliasModerationTypes);
  })
});
