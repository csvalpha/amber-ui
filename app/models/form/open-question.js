import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class OpenQuestion extends Model {
  @attr question;
  @attr fieldType;
  @attr position;
  @attr required;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('form/form') form;
  @hasMany('form/open-question-answer') answers;

  // Getters
  isOpenQuestion = true;

  get sumOfAnswers() {
    if (this.fieldType === 'number') {
      const answers = this.answers.filterBy('completed', true);
      return answers.mapBy('answer').reduce((a, b) => {
        return parseFloat(a) + parseFloat(b);
      }, 0);
    }

    return null;
  }
}
