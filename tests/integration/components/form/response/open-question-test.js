import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from 'alpha-amber/tests/helpers/setup-mirage-for-integration';
import component from 'alpha-amber/tests/pages/components/form/response/open-question';
import { create } from 'ember-cli-page-object';

let page;

moduleForComponent('form/response/open-question', 'Integration | Component | form/response/open question', {
  integration: true,
  beforeEach() {
    startMirage(this.container);

    page = create(component);
    page.setContext(this);

    this.set('question', server.create('formOpenQuestion', { fieldType: 'text' }));
    this.set('answer', server.create('formOpenQuestionAnswer', { question: this.get('question') }));
  },
  afterEach() {
    window.server.shutdown();
    page.removeContext();
  }
});

test('it shows the current answer value', function(assert) {
  page.render(hbs`{{form/response/open-question question answer}}`);
  assert.equal(page.value, this.get('answer.answer'));
});

test('it updates the answer value', function(assert) {
  page.render(hbs`{{form/response/open-question question answer}}`);
  page.fillInValue('test value');
  assert.equal(page.value, 'test value');
  assert.equal(this.get('answer.answer'), 'test value');
});
