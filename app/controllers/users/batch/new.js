import { inject as service } from '@ember/service';
import EmberArray, { A } from '@ember/array';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isInvalidResponse } from 'ember-fetch/errors';

export default Controller.extend({
  flashNotice: service('flash-notice'),
  fetch: service(),
  successMessage: null,
  importFile: null,
  addToGroup: null,
  reviewing: false,
  newUsers: A(),
  importErrors: A(),
  properties: A(),

  validMimetypes: EmberArray.apply([
    'text/csv',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.macroenabled.12',
  ]),
  validExtensions: EmberArray.apply(['csv', 'ods', 'xlsx', 'xlsm']),

  groups: computed('store', function () {
    return this.store.findAll('group');
  }),

  actions: {
    fileLoaded(file) {
      this.newUsers.clear();
      this.importErrors.clear();
      this.set('importFile', file.data);
    },
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
    },
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
    },
  },
});
