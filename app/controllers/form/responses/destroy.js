import { inject as service } from '@ember/service';
import DestroyController from 'amber-ui/controllers/application/destroy';

export default DestroyController.extend({
  store: service(),
  successMessage: 'Je inschrijving is verwijderd.',
  successTransitionTarget: 'activities.index',
  actions: {
    destroy() {
      this.set('form', this.model.form);
      this._super(...arguments);
    },
    onSuccess() {
      this._super(...arguments);
      // Reload form to update fields as 'currentUserResponseCompleted', 'currentUserResponseId' and 'amountOfResponses'
      this.store.peekRecord('form/form', this.form.id).reload();
    },
    onError() {
      this.set('errorMessage', 'Er ging iets fout bij het verwijderen');
    },
  },
});
