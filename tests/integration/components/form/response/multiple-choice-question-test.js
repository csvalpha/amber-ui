import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from 'alpha-amber/tests/helpers/setup-mirage-for-integration';
import component from 'alpha-amber/tests/pages/components/form/multiple-choice-question';
import { create } from 'ember-cli-page-object';
import createEmberModel from 'alpha-amber/tests/helpers/create-ember-model';

let page;

moduleForComponent('form/response/multiple-choice-question', 'Integration | Component | form/response/multiple choice question', {
  integration: true,
  beforeEach() {
    startMirage(this.container);

    const store = this.container.lookup('service:store');

    page = create(component);
    page.setContext(this);

    // Create a question
    const generatedQuestion = server.create('formClosedQuestion', { fieldType: 'checkbox' });
    const question = createEmberModel(generatedQuestion, store);

    const options = generatedQuestion.options.models.map(option => createEmberModel(option, store));
    question.get('options').pushObjects(options);

    // Create an answer for the first option, making the first option selected by default
    const answer = createEmberModel(server.create('formClosedQuestionAnswer'), store);
    answer.set('option', question.get('sortedOptions.firstObject'));
    const answers = new A([answer]);

    this.set('question', question);
    this.set('answers', answers);
    this.set('updateAnswers', (question, optionIds) => {
      this.get('answers').clear();
      this.get('answers').pushObjects(new A(optionIds).map(
        id => EmberObject.create({
          option: EmberObject.create({ id })
        })
      ));
    });
  },
  afterEach() {
    window.server.shutdown();
    page.removeContext();
  }
});

test('it shows all options', function(assert) {
  page.render(hbs`{{form/response/multiple-choice-question question answers updateAnswers=(action updateAnswers)}}`);
  assert.equal(page.options().count, 4);
  [0, 1, 2, 3].forEach(index => {
    assert.equal(page.options(index).label, this.get('question.sortedOptions')[index].get('option'));
    assert.equal(page.options(index).value, this.get('question.sortedOptions')[index].get('id'));
  });
});

test('it has selected the current answer value', function(assert) {
  page.render(hbs`{{form/response/multiple-choice-question question answers updateAnswers=(action updateAnswers)}}`);
  assert.ok(page.options(0).checked);
  assert.notOk(page.options(1).checked);
  assert.notOk(page.options(2).checked);
  assert.notOk(page.options(3).checked);
  assert.equal(this.get('answers.length'), 1);
  assert.ok(this.get('answers').findBy('option.id', page.options(0).value));
});
