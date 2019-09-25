import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export default Controller.extend({
  flashNotice: service('flash-notice'),
  canSubmitResponse: computed('model.form', 'model.form.currentUserCanRespond', function() {
    const form = this.get('model.form');
    return !isNone(form) && form.get('currentUserCanRespond');
  }),
  actions: {
    submitResponse() {
      const currentUserResponse = this.get('model.currentUserResponse');
      const form = this.get('model.form');
      // const flashNotice = this.flashNotice;
      currentUserResponse.saveWithAnswers().then(() => {
        // The response is the first thing that is saved (in order to save answers), so currently the response is
        // always 'incomplete'. Furthermore, the form has a field 'amountOfResponses' which should be updated.
        // We now reload the response and the corresponding form.
        currentUserResponse.reload();
        form.reload();
        this.flashNotice.sendSuccess('Inschrijving opgeslagen');
      }).catch(error => {
        this.set('errorMessage', error.message);
        if (error.payload.errors && error.payload.errors.isAny('source.pointer', '/data/attributes/user')) {
          this.set('errorMessage', 'Er is al een response gevonden, probeer eerst te refreshen, zie je dit formulier dan nog? Neem dan contact op met de ict-commissie.');
        }
      });
    }
  }
});
