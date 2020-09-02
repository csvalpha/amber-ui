import Model, { belongsTo, attr } from '@ember-data/model';
import { isNone } from '@ember/utils';

export default class Poll extends Model {
  // Properties
  @attr createdAt;
  @attr updatedAt;

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
    return moment().isBefore(this.form.respondUntil);
  }

  get opensLater() {
    return moment().isBofre(this.form.respondFrom);
  }

  get closedWithNoResponses() {
    return moment().isAfter(this.form.respondUntil) && this.form.amountOfResponses === 0;

  }

  // Methods
  saveWithForm() {
    return this.form.then(form => {
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
    this.form.then(form => {
      form?.rollbackAttributesAndQuestions();
    });
  }

  isOwner(user) {
    if (user.id === this.author.get('id')) {
      return true;
    }

    return user.get('memberships').then(() => {
      return user.get('currentMemberships').some(membership => membership.group.id === this.group.id);
    });
  }
}
