import { JSONAPISerializer } from 'ember-cli-mirage';
import { underscore } from '@ember/string';

const modelNames = {
  'form-closed-question': 'closed_questions',
  'form-closed-question-answer': 'closed_question_answers',
  'form-closed-question-option': 'closed_question_options',
  'form-form': 'forms',
  'form-open-question': 'open_questions',
  'form-open-question-answer': 'open_question_answers',
  'form-response': 'responses',
  'forum-category': 'categories',
  'forum-post': 'posts',
  'forum-thread': 'threads'
};

export default JSONAPISerializer.extend({
  typeKeyForModel(model) {
    if (model.modelName in modelNames) {
      return modelNames[model.modelName];
    }
    return underscore(JSONAPISerializer.prototype.typeKeyForModel(model));
  },
  serialize(object) {
    // This is how to call super, as Mirage borrows [Backbone's implementation of extend](http://backbonejs.org/#Model-extend)
    const json = JSONAPISerializer.prototype.serialize.apply(this, arguments);

    if (this.isCollection(object)) {
      json.meta = {
        // When there are no models, there is no page. Otherwise, all models are in 1 page
        // eslint-disable-next-line camelcase
        total_pages: object.length > 0 ? 1 : 0
      };
    }

    return json;
  },
  keyForAttribute(attr) {
    return underscore(attr);
  },
  keyForRelationship(modelName) {
    return underscore(modelName);
  }
});
