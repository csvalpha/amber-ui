import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import {
  PicturePublicationPreferenceTypes,
  UserDetailsPreferenceTypes,
} from 'amber-ui/constants';
import { tracked } from '@glimmer/tracking';

export default class PrivacyModal extends Component {
  @service session;
  @service store;
  @service fetch;
  get model() {
    return this.session.currentUser;
  }

  @tracked isOpen = false;
  @tracked step = 1;
  maxSteps = 6;
  @tracked errorMessage = null;
  get userDetailsPreferenceTypes() {
    return Object.entries(UserDetailsPreferenceTypes).map(([value, label]) => ({
      value,
      label,
    }));
  }

  get picturePublicationPreferenceTypes() {
    return Object.entries(PicturePublicationPreferenceTypes).map(
      ([value, label]) => ({ value, label })
    );
  }

  @action async select(attribute, value) {
    this.model.set(attribute, value);
    try {
      await this.model.save();
      this.nextPage();
    } catch (error) {
      this.errorMessage = error.errors.map((e) => e.detail).join(', ');
    }
  }

  @action nextPage() {
    this.errorMessage = null;
    if (this.step >= this.maxSteps) {
      this.isOpen = false;
      return;
    }
    this.step = this.step + 1;
  }

  @action async allowWebdav() {
    await this.fetch.fetch(`/users/${this.model.id}/activate_webdav`, {
      method: 'POST',
    });
    this.model.reload();
    this.nextPage();
  }

  constructor() {
    super(...arguments);
    if (
      this.model?.userDetailsSharingPreference === null ||
      this.model?.allowSofiaSharing === null
    ) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }
}
//
// export default Component.extend({
//   session: service(),
//   store: service(),
//   fetch: service(),
//   model: alias('session.currentUser'),
//   isOpen: false,
//   step: 1,
//   maxSteps: 6,
//   errorMessage: null,
//   userDetailsPreferenceTypes: computed(function () {
//     return Object.entries(UserDetailsPreferenceTypes).map(([value, label]) => ({
//       value,
//       label,
//     }));
//   }),
//   picturePublicationPreferenceTypes: computed(function () {
//     return Object.entries(PicturePublicationPreferenceTypes).map(
//       ([value, label]) => ({ value, label })
//     );
//   }),
//   actions: {
//     select(attribute, value) {
//       this.model.set(attribute, value);
//       this.model
//         .save()
//         .then(() => {
//           this.send('nextPage');
//         })
//         .catch((error) => {
//           this.set(
//             'errorMessage',
//             error.errors
//               .map((e) => {
//                 return e.detail;
//               })
//               .join(', ')
//           );
//         });
//     },
//     nextPage() {
//       this.set('errorMessage', null);
//       if (this.step >= this.maxSteps) {
//         this.set('isOpen', false);
//       } else {
//         this.set('step', this.step + 1);
//       }
//     },
//     allowWebdav() {
//       return this.fetch
//         .fetch(`/users/${this.model.id}/activate_webdav`, { method: 'POST' })
//         .then(() => {
//           this.model.reload();
//           this.send('nextPage');
//         });
//     },
//   },
//   init() {
//     this._super(...arguments);
//     if (
//       this.model?.userDetailsSharingPreference === null ||
//       this.model?.allowTomatoSharing === null
//     ) {
//       this.set('isOpen', true);
//     } else {
//       this.set('isOpen', false);
//     }
//   },
// });
