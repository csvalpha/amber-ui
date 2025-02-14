import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormResponseCardComponent extends Component {
  @service flashNotice;
  @tracked errorMessage = null;

  @action
  async submitResponse() {
    try {
      await this.args.response.saveWithAnswers();
      // The response is the first thing that is saved (in order to save answers), so currently the response is
      // always 'incomplete'. Furthermore, the form has a field 'amountOfResponses' which should be updated.
      // We now reload the response and the corresponding form.
      this.args.response.reload();
      this.args.form.reload();
      this.flashNotice.sendSuccess('Inschrijving opgeslagen');
    } catch (error) {
      this.errorMessage = error.message;
      if (
        error.payload?.errors &&
        error.payload.errors.isAny('source.pointer', '/data/attributes/user')
      ) {
        this.errorMessage =
          'Er is al een response gevonden, probeer eerst te refreshen, zie je dit formulier dan nog? Neem dan contact op met de ict-commissie.';
      }
    }
  }
}
