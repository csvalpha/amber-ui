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
    return this.get('store').findAll('group');
  }),

  actions: {
    fileLoaded(file) {
      this.get('newUsers').clear();
      this.get('importErrors').clear();
      this.set('importFile', file.data);
    },
    uploadFile() {
      const groupId = this.get('addToGroup') ? this.get('addToGroup').id : null;
      return this.get('ajax').post('/users/batch_import', { data: { file: this.get('importFile'), group: groupId } }).then(result => {
        this.get('newUsers').clear();
        this.get('importErrors').clear();

        JSON.parse(result.users).forEach(jsonObject => {
          this.set('properties', Object.keys(jsonObject));
          this.get('newUsers').pushObject(jsonObject);
        });

        if (result.errors && result.errors.user) {
          result.errors.user.forEach(jsonObject => {
            this.get('importErrors').pushObject(jsonObject);
          });
        }
      }).catch(error => {
        this.get('newUsers').clear();
        this.get('importErrors').clear();

        if (error.payload.errors && error.payload.errors.header) {
          error.payload.errors.header.forEach(jsonObject => {
            this.get('importErrors').pushObject(jsonObject);
          });
        }
      });
    },
    confirmUpload() {
      const groupId = this.get('addToGroup') ? this.get('addToGroup').id : null;

      /* eslint-disable camelcase */
      return this.get('ajax').post('/users/batch_import', { data: { file: this.get('importFile'), group: groupId, live_run: true } }).then(() => {
        this.get('flashNotice').sendSuccess('Gebruikers opgeslagen');
        this.transitionToRoute('users.index');
      }).catch(() => {
        this.get('flashNotice').sendError('Gebruikers niet opgeslagen');
        this.transitionToRoute('users.batch.new');
      });
      /* eslint-enable camelcase */
    }
  }
});
