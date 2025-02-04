import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';
import {
  PicturePublicationPreferenceTypes,
  UserDetailsPreferenceTypes,
} from 'amber-ui/constants';

export default Component.extend({
  session: service(),
  store: service(),
  fetch: service(),
  model: alias('session.currentUser'),
  isOpen: false,
  step: 1,
  maxSteps: 6,
  errorMessage: null,
  userDetailsPreferenceTypes: computed(function () {
    return Object.entries(UserDetailsPreferenceTypes).map(([value, label]) => ({
      value,
      label,
    }));
  }),
  picturePublicationPreferenceTypes: computed(function () {
    return Object.entries(PicturePublicationPreferenceTypes).map(
      ([value, label]) => ({ value, label })
    );
  }),
  actions: {
    select(attribute, value) {
      this.model.set(attribute, value);
      this.model
        .save()
        .then(() => {
          this.send('nextPage');
        })
        .catch((error) => {
          this.set(
            'errorMessage',
            error.errors
              .map((e) => {
                return e.detail;
              })
              .join(', ')
          );
        });
    },
    nextPage() {
      this.set('errorMessage', null);
      if (this.step >= this.maxSteps) {
        this.set('isOpen', false);
      } else {
        this.set('step', this.step + 1);
      }
    },
    allowWebdav() {
      return this.fetch
        .fetch(`/users/${this.model.id}/activate_webdav`, { method: 'POST' })
        .then(() => {
          this.model.reload();
          this.send('nextPage');
        });
    },
  },
  init() {
    this._super(...arguments);
    if (
      this.model?.userDetailsSharingPreference === null ||
      this.model?.allowSofiaSharing === null
    ) {
      this.set('isOpen', true);
    } else {
      this.set('isOpen', false);
    }
  },
});
