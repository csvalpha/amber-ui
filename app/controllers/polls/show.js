// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import EmberObject, { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import FormLoadOrCreateUtil from 'alpha-amber/lib/utils/form-load-or-create';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class PollsShowController extends Controller {
  @service('flash-notice') flashNotice
  @service store

  @tracked errorMessage = null

  constructor() {
    super(...arguments);
    this.formLoadOrCreateUtil = new FormLoadOrCreateUtil(this);
  }

  @computed('model.form', 'model.form.currentUserCanRespond')
  get canSubmitResponse() {
    const { form } = this.model;
    return !isNone(form) && form.get('currentUserCanRespond');
  }

  @computed('model.poll.question.options.@each.option', 'model.poll.question.options.@each.sumOfAnswers', 'model.poll.form.amountOfResponses')
  get optionsWithResults() {
    const { options } = this.model.poll.question;
    const amountOfResponses = this.model.poll.form.get('amountOfResponses');

    return options.map(option => {
      // When multiple answers per user are allowed we need to divide by the total amount of users
      // When only one answer is allowed we need to divided by the total amount of answers,
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
  }

  @action
  submitResponse() {
    const { currentUserResponse } = this.model;
    const { form } = this.model;
    currentUserResponse.saveWithAnswers().then(() => {
      // The response is the first thing that is saved (in order to save answers), so currently the response is
      // always 'incomplete'. Furthermore, the form has a field 'amountOfResponses' which should be updated.
      // We now reload the response and the corresponding form.
      currentUserResponse.reload();
      form.reload();
      this.flashNotice.sendSuccess('Keuze opgeslagen');
    }).catch(error => {
      this.errorMessage = error.message;
      if (error.errors && error.errors.isAny('source.pointer', '/data/relationships/user')) {
        this.errorMessage = 'Er is al een keuze gevonden, probeer eerst te refreshen, zie je dit formulier dan nog? Neem dan contact op met de ict-commissie.';
      }
    });
  }
}
