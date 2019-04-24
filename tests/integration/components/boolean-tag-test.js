import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import component from 'alpha-amber/tests/pages/components/boolean-tag';
import { create } from 'ember-cli-page-object';

let page;

moduleForComponent('boolean-tag', 'Integration | Component | boolean tag', {
  integration: true,
  beforeEach() {
    page = create(component);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it display the boolean value', function(assert) {
  this.set('value', true);
  page.render(hbs`{{boolean-tag value}}`);
  assert.equal(page.text, 'Ja');

  this.set('value', false);
  page.render(hbs`{{boolean-tag value}}`);
  assert.equal(page.text, 'Nee');
});

test('it displays the corresponding contextual color', function(assert) {
  this.set('value', true);
  page.render(hbs`{{boolean-tag value}}`);
  assert.ok(page.hasSuccess);
  assert.notOk(page.hasDanger);

  this.set('value', false);
  page.render(hbs`{{boolean-tag value}}`);
  assert.notOk(page.hasSuccess);
  assert.ok(page.hasDanger);
});
