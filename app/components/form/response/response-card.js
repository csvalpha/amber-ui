import Component from '@ember/component';
import {inject as service} from "@ember/service";

const FormResponseCardComponent = Component.extend({
  flashNotice: service('flash-notice'),
  classNames: ['card'],
  form: null,
  response: null,
  errorMessage: null,
  actions: {
    submitResponse() {
      this.response.saveWithAnswers().then(() => {
        // The response is the first thing that is saved (in order to save answers), so currently the response is
        // always 'incomplete'. Furthermore, the form has a field 'amountOfResponses' which should be updated.
        // We now reload the response and the corresponding form.
        this.response.reload();
        this.form.reload();
        this.flashNotice.sendSuccess('Inschrijving opgeslagen');
      }).catch(error => {
        this.set('errorMessage', error.message);
        if (error.payload?.errors && error.payload.errors.isAny('source.pointer', '/data/attributes/user')) {
          this.set('errorMessage', 'Er is al een response gevonden, probeer eerst te refreshen, zie je dit formulier dan nog? Neem dan contact op met de ict-commissie.');
        }
      });
    }
  }
});

FormResponseCardComponent.reopenClass({
  positionalParams: ['form', 'response']
});

export default FormResponseCardComponent;
