import { inject as service } from '@ember/service';
import EmberArray, { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isInvalidResponse } from 'ember-fetch/errors';
import NewController from 'amber-ui/controllers//application/new';

export default class NewUserBatchController extends NewController {
  successMessage = 'Gebruikers aanmaken gelukt!';
  cancelMessage = 'Gebruikers aanmaken geannuleerd.';
  cancelTransitionTarget = 'users.index';
  successTransitionTarget = 'users.index';
  get successTransitionModel() {
    return null;
  }

  @service fetch;
  @tracked importFile = null;
  @tracked addToGroup = null;
  @tracked reviewing = false;
  @tracked newUsers = A();
  @tracked importErrors = A();
  @tracked properties = A();

  validMimetypes = 'text/csv';
  validExtensions = EmberArray.apply(['csv']);

  get groups() {
    return this.store.findAll('group');
  }

  @action
  fileLoaded(file) {
    this.newUsers.clear();
    this.importErrors.clear();
    this.set('importFile', file.data);
  }

  @action
  async uploadFile() {
    const groupId = this.addToGroup ? this.addToGroup.id : null;
    let response = await this.fetch.post('/users/batch_import', {
      body: { file: this.importFile, group: groupId },
    });
    const json = await response.json();

    if (response.ok) {
      this.newUsers.clear();
      this.importErrors.clear();

      JSON.parse(json.users).forEach((jsonObject) => {
        this.set('properties', Object.keys(jsonObject));
        this.newUsers.pushObject(jsonObject);
      });

      if (json.errors && json.errors.user) {
        json.errors.user.forEach((jsonObject) => {
          this.importErrors.pushObject(jsonObject);
        });
      }
    } else if (isInvalidResponse(response)) {
      this.newUsers.clear();
      this.importErrors.clear();

      if (json.errors && json.errors.header) {
        json.errors.header.forEach((jsonObject) => {
          this.importErrors.pushObject(jsonObject);
        });
      }
    }
  }

  @action
  async confirmUpload() {
    const groupId = this.addToGroup ? this.addToGroup.id : null;

    const response = await this.fetch.post('/users/batch_import', {
      /* eslint-disable camelcase */
      body: {
        file: this.importFile,
        group: groupId,
        live_run: true,
      },
      /* eslint-enable camelcase */
    });

    if (response.ok) {
      this.flashNotice.sendSuccess('Gebruikers opgeslagen');
      this.transitionToRoute('users.index');
    } else {
      this.flashNotice.sendError('Gebruikers niet opgeslagen');
      this.transitionToRoute('users.batch.new');
    }
  }
}
