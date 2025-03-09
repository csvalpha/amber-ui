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
  maxSteps = 7;
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

  @action async nextPage() {
    this.errorMessage = null;
    if (this.step >= this.maxSteps) {
      this.model.set('setupComplete', true);
      try {
        await this.model.save();
      } catch (error) {
        this.errorMessage = error.errors.map((e) => e.detail).join(', ');
        return;
      }
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
    if (this.model?.setupComplete == false) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }
}
