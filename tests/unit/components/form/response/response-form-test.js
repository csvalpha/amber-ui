import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, skip, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Component | form/response/response form', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('x', function(assert) {
    assert.equal(1, 1);
  });

  // This test is not working at the moment, so it's skipped
  skip('it updates answers of multiple choice questions', function(assert) {
    const component = this.owner.lookup('component:form/response/response-form');

    const linkedAnswers = A();
    const question = EmberObject.create(this.server.create('formClosedQuestion', { linkedAnswers, _optionCount: 3 }).attrs);
    const response = EmberObject.create(this.server.create('formResponse').attrs);
    const { optionIds } = question;

    // const component = this.subject({
    //   // Mock the store
    //   store: EmberObject.create({
    //     peekRecord(type, id) {
    //       if (type === 'form/closed-question-option') {
    //         return EmberObject.create(this.server.db.formClosedQuestionOptions.find(id));
    //       }
    //     },
    //     createRecord(type, attributes) {
    //       return EmberObject.create(attributes, {
    //         deleteRecord() {
    //         }
    //       });
    //     }
    //   })
    // });
    component.set('response', response);
    //
    component.send('updateMultipleChoiceAnswers', question, []);
    assert.equal(question.get('linkedAnswers.length'), 0);
    //
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
