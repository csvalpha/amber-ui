import Model, { belongsTo, attr } from '@ember-data/model';
import { isNone } from '@ember/utils';
import moment from 'moment';

export default class Poll extends Model {
  // Properties
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('user') author;
  @belongsTo('form/form') form;

  // getters
  get question() {
    return this.form.get('closedQuestions').firstObject;
  }

  get currentUserCanRespond() {
    return this.form.get('currentUserCanRespond');
  }

  get currentUserResponseCompleted() {
    return this.form.curentUserResponseCompleted;
  }

  get closesLater() {
    return moment().isBefore(this.form.get('respondUntil'));
  }

  get opensLater() {
    return moment().isBefore(this.form.get('respondFrom'));
  }

  get closedWithNoResponses() {
    return (
      moment().isAfter(this.form.get('respondUntil')) &&
      this.form.get('amountOfResponses') === 0
    );
  }

  // Methods
  saveWithForm() {
    return this.form.then((form) => {
      if (!isNone(form)) {
        return form.saveWithQuestions().then(() => {
          return this.save();
        });
      }

      return this.save();
    });
  }

  rollbackAttributesAndForm() {
    this.rollbackAttributes();
    this.form.then((form) => {
      form?.rollbackAttributesAndQuestions();
    });
  }
}
