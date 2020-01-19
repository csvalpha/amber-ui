import { inject as service } from '@ember/service';
import EmberArray, { A } from '@ember/array';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  flashNotice: service('flash-notice'),
  ajax: service('ajax'),
  successMessage: null,
  importFile: null,
  addToGroup: null,
  reviewing: false,
  newUsers: new A(),
  importErrors: new A(),
  properties: new A(),

  validMimetypes: 'text/csv',
  validExtensions: EmberArray.apply(['csv']),

  groups: computed(function() {
    return this.store.findAll('group');
  }),

  actions: {
    fileLoaded(file) {
      this.newUsers.clear();
      this.importErrors.clear();
      this.set('importFile', file.data);
    },
    uploadFile() {
      const groupId = this.addToGroup ? this.addToGroup.id : null;
      return this.ajax.post('/users/batch_import', { data: { file: this.importFile, group: groupId } }).then(result => {
        this.newUsers.clear();
        this.importErrors.clear();

        JSON.parse(result.users).forEach(jsonObject => {
          this.set('properties', Object.keys(jsonObject));
          this.newUsers.pushObject(jsonObject);
        });

        if (result.errors && result.errors.user) {
          result.errors.user.forEach(jsonObject => {
            this.importErrors.pushObject(jsonObject);
          });
        }
      }).catch(error => {
        this.newUsers.clear();
        this.importErrors.clear();

        if (error.payload.errors && error.payload.errors.header) {
          error.payload.errors.header.forEach(jsonObject => {
            this.importErrors.pushObject(jsonObject);
          });
        }
      });
    },
    confirmUpload() {
      const groupId = this.addToGroup ? this.addToGroup.id : null;

      /* eslint-disable camelcase */
      return this.ajax.post('/users/batch_import', { data: { file: this.importFile, group: groupId, live_run: true } }).then(() => {
        this.flashNotice.sendSuccess('Gebruikers opgeslagen');
        this.transitionToRoute('users.index');
      }).catch(() => {
        this.flashNotice.sendError('Gebruikers niet opgeslagen');
        this.transitionToRoute('users.batch.new');
      });
      /* eslint-enable camelcase */
    }
  }
});
