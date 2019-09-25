import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import formLoadOrCreateMixin from 'alpha-amber/mixins/form-load-or-create-mixin';

export default Controller.extend(formLoadOrCreateMixin, {
  flashNotice: service('flash-notice'),
  canSubmitResponse: computed('model.form', 'model.form.currentUserCanRespond', function() {
    const form = this.get('model.form');
    return !isNone(form) && form.get('currentUserCanRespond');
  }),
  optionsWithResults: computed('model.poll.question.options.@each.option', 'model.poll.question.options.@each.sumOfAnswers', 'model.poll.form.amountOfResponses', function() {
    const options = this.get('model.poll.question.options');
    const amountOfResponses = this.get('model.poll.form.amountOfResponses');

    return options.map(option => {
      // When multiple answers per user are allowed we need to devide by the total amount of users
      // When only one answer is allowed we need to devided by the total amount of answers,
      // which is equal to the total amount of users in that case
      const percentage = option.get('sumOfAnswers') / amountOfResponses * 100;

      const roundedPercentage = percentage.toFixed();

      return EmberObject.create({
        label: option.get('option'),
        value: option.get('sumOfAnswers'),
        percentage: roundedPercentage,
        style: htmlSafe(`width: ${percentage}%`)
      });
    }).sortBy('value').reverse();
  }),
  actions: {
    submitResponse() {
      const currentUserResponse = this.get('model.currentUserResponse');
      const form = this.get('model.form');
      const flashNotice = this.flashNotice;
      currentUserResponse.saveWithAnswers().then(() => {
        // The response is the first thing that is saved (in order to save answers), so currently the response is
        // always 'incomplete'. Furthermore, the form has a field 'amountOfResponses' which should be updated.
        // We now reload the response and the corresponding form.
        currentUserResponse.reload();
        form.reload();
        flashNotice.sendSuccess('Keuze opgeslagen');
      }).catch(error => {
        this.set('errorMessage', error.message);
        if (error.errors && error.errors.isAny('source.pointer', '/data/relationships/user')) {
          this.set('errorMessage', 'Er is al een keuze gevonden, probeer eerst te refreshen, zie je dit formulier dan nog? Neem dan contact op met de ict-commissie.');
        }
      });
    }
  }
});
