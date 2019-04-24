import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from 'alpha-amber/tests/helpers/setup-mirage-for-integration';
import componentPageObject from 'alpha-amber/tests/pages/components/form/response/closed-question';
import { create } from 'ember-cli-page-object';
import createEmberModel from 'alpha-amber/tests/helpers/create-ember-model';

let component;

moduleForComponent('form/response/closed-question', 'Integration | Component | form/response/closed question', {
  integration: true,
  beforeEach() {
    startMirage(this.container);

    const store = this.container.lookup('service:store');

    component = create(componentPageObject);
    component.setContext(this);

    // Mirage returns POJO's (plain old javascript object), which are translated to ember models
    const generatedQuestion = server.create('formClosedQuestion', { fieldType: 'radio' });
    const question = createEmberModel(generatedQuestion, store);

    const options = generatedQuestion.options.models.map(option => createEmberModel(option, store));
    question.get('options').pushObjects(options);

    const answer = createEmberModel(server.create('formClosedQuestionAnswer'), store);
    answer.set('option', question.get('sortedOptions.firstObject'));

    this.set('question', question);
    this.set('answer', answer);
  },
  afterEach() {
    window.server.shutdown();
    component.removeContext();
  }
});

test('it shows all options', function(assert) {
  component.render(hbs`{{form/response/closed-question question answer}}`);
  assert.equal(component.options().count, 4);
  const options = this.get('question.sortedOptions');
  [0, 1, 2, 3].forEach(index => {
    assert.equal(component.options(index).label, options.objectAt(index).get('option'));
    assert.equal(component.options(index).value, options.objectAt(index).get('id'));
  });
});

test('it has selected the current answer value', function(assert) {
  component.render(hbs`{{form/response/closed-question question answer}}`);
  assert.ok(component.options(0).checked);
  assert.notOk(component.options(1).checked);
  assert.notOk(component.options(2).checked);
  assert.notOk(component.options(3).checked);
  assert.equal(this.get('answer.option.id'), component.options(0).value);
  assert.equal(this.get('answer.option.option'), component.options(0).label);
});

test('it updates the answer value', function(assert) {
  component.render(hbs`{{form/response/closed-question question answer}}`);
  component.options(1).check();
  assert.notOk(component.options(0).checked);
  assert.ok(component.options(1).checked);
  assert.notOk(component.options(2).checked);
  assert.notOk(component.options(3).checked);
  assert.equal(this.get('answer.option.id'), component.options(1).value);
  assert.equal(this.get('answer.option.option'), component.options(1).label);
});
