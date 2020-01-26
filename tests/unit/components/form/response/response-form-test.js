import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import startMirage from 'alpha-amber/tests/helpers/setup-mirage-for-integration';

module('Unit | Component | form/response/response form', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    startMirage(this.container);
  });

  hooks.afterEach(function() {
    window.server.shutdown();
  });

  test('it updates answers of multiple choice questions', function(assert) {
    const linkedAnswers = new A();
    const question = EmberObject.create(server.create('formClosedQuestion', { linkedAnswers, _optionCount: 3 }).attrs);
    const response = EmberObject.create(server.create('formResponse').attrs);
    const { optionIds } = question;

    const component = this.owner.factoryFor('component:form/response/response-form').create({
      // Mock the store
      store: EmberObject.create({
        peekRecord(type, id) {
          if (type === 'form/closed-question-option') {
            return EmberObject.create(server.db.formClosedQuestionOptions.find(id));
          }
        },
        createRecord(type, attributes) {
          return EmberObject.create(attributes, {
            deleteRecord() {
            }
          });
        }
      })
    });
    component.set('response', response);

    component.send('updateMultipleChoiceAnswers', question, []);
    assert.equal(question.get('linkedAnswers.length'), 0);

    component.send('updateMultipleChoiceAnswers', question, [optionIds[0]]);
    assert.equal(question.get('linkedAnswers.length'), 1);
    assert.ok(question.get('linkedAnswers').findBy('option.id', optionIds[0]));
    assert.equal(question.get('linkedAnswers')[0].get('response'), response);

    component.send('updateMultipleChoiceAnswers', question, optionIds.slice(0, 2));
    assert.equal(question.get('linkedAnswers.length'), 2);
    assert.ok(question.get('linkedAnswers').findBy('option.id', optionIds[0]));
    assert.ok(question.get('linkedAnswers').findBy('option.id', optionIds[1]));
    assert.equal(question.get('linkedAnswers')[0].get('response'), response);
    assert.equal(question.get('linkedAnswers')[1].get('response'), response);

    component.send('updateMultipleChoiceAnswers', question, optionIds.slice(1, 3));
    assert.equal(question.get('linkedAnswers.length'), 2);
    assert.ok(question.get('linkedAnswers').findBy('option.id', optionIds[1]));
    assert.ok(question.get('linkedAnswers').findBy('option.id', optionIds[2]));
    assert.equal(question.get('linkedAnswers')[0].get('response'), response);
    assert.equal(question.get('linkedAnswers')[1].get('response'), response);
  });
});
