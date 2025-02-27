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

  @tracked step = 1;
  maxSteps = 7;
  @tracked errorMessage = null;

  get model() {
    return this.session.currentUser;
  }

  get isOpen() {
    return this.model ? !this.model.setupComplete : false;
  }

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
    if (!this.model) return;
    this.model.set(attribute, value);
    try {
      await this.model.save();
      this.nextPage();
    } catch (error) {
      this.errorMessage = error.errors.map((e) => e.detail).join(', ');
    }
  }

  @action async nextPage() {
    if (!this.model) return;
    this.errorMessage = null;
    if (this.step >= this.maxSteps) {
      try {
        this.model.set('setupComplete', true);
        await this.model.save();
      } catch (error) {
        this.errorMessage = 'Failed to complete setup. Please try again.';
      }
      return;
    }
    this.step++;
  }

  @action async allowWebdav() {
    if (!this.model) return;
    try {
      await this.fetch.fetch(`/users/${this.model.id}/activate_webdav`, {
        method: 'POST',
      });
      await this.model.reload();
      this.nextPage();
    } catch (error) {
      this.errorMessage = 'Failed to activate WebDAV. Please try again.';
    }
  }
}
