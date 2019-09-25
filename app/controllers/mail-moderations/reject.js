import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  ajax: service('ajax'),
  errorMessage: null,
  actions: {
    submit() {
      const id = this.get('model.id');
      this.set('errorMessage', null);
      this.ajax.post(`/stored_mails/${id}/reject`).then(() => {
        this.model.unloadRecord();
        this.transitionToRoute('mail-moderations.index');
      }).catch((error) => {
        this.set('errorMessage', error.message);
      });
    }
  }
});
