import { computed } from '@ember/object';
import EditController from 'alpha-amber/controllers/application/edit';
import { MailAliasModerationTypes } from 'alpha-amber/constants';

export default EditController.extend({
  successTransitionTarget: 'mail-aliases.show',

  moderationTypeOpen: computed('model.moderationType', function() {
    return this.get('model.moderationType') === 'open';
  }),

  groups: computed('store', function() {
    return this.store.findAll('group');
  }),
  users: computed('store', function() {
    return this.store.findAll('user');
  }),

  anyUser: computed('model.user.id', function() {
    return this.get('model.user.id');
  }),

  anyGroup: computed('model.group.id', function() {
    return this.get('model.group.id');
  }),

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
