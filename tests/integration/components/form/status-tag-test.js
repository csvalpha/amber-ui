import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import componentPageObject from 'alpha-amber/tests/pages/components/form/status-tag';
import { create } from 'ember-cli-page-object';

let component;

moduleForComponent('form/status-tag', 'Integration | Component | form/status tag', {
  integration: true,
  beforeEach() {
    component = create(componentPageObject);
    component.setContext(this);
  },
  afterEach() {
    component.removeContext();
  }
});

test('it displays "Vrij toegankelijk" when form is null', function(assert) {
  this.set('form', null);
  component.render(hbs`{{form/status-tag form}}`);
  assert.equal(component.content, 'Vrij toegankelijk');
});

test('it displays content corresponding to the form', function(assert) {
  const yesterday = new Date((new Date()).valueOf() - (1000 * 3600 * 24));
  const tomorrow = new Date((new Date()).valueOf() + (1000 * 3600 * 24));
  const scenarios = [
    { canRespond: true, currentUserResponseCompleted: false, respondFrom: yesterday, expected: 'Open' },
    { canRespond: true, currentUserResponseCompleted: true, respondFrom: yesterday, expected: 'Ingeschreven' },
    { canRespond: false, currentUserResponseCompleted: false, respondFrom: yesterday, expected: 'Gesloten' },
    { canRespond: false, currentUserResponseCompleted: false, respondFrom: tomorrow, expected: 'Opent later' },
    { canRespond: false, currentUserResponseCompleted: true, respondFrom: yesterday, expected: 'Ingeschreven' }
  ];

  scenarios.forEach(({ canRespond, currentUserResponseCompleted, respondFrom, expected }) => {
    this.set('activity', EmberObject.create());
    this.set('form', EmberObject.create({ canRespond, currentUserResponseCompleted, respondFrom }));
    component.render(hbs`{{form/status-tag form}}`);
    assert.equal(component.content, expected);
  });
});

test('it has the success class when form is null', function(assert) {
  this.set('form', null);
  component.render(hbs`{{form/status-tag form}}`);

  assert.notOk(component.hasDefaultClass);
  assert.notOk(component.hasInfoClass);
  assert.ok(component.hasSuccessClass);
  assert.notOk(component.hasDangerClass);
});

test('it has the class corresponding to the form', function(assert) {
  const yesterday = new Date((new Date()).valueOf() - (1000 * 3600 * 24));
  const tomorrow = new Date((new Date()).valueOf() + (1000 * 3600 * 24));
  const scenarios = [
    { canRespond: true, currentUserResponseCompleted: false, respondFrom: yesterday, expectedClass: 'info' },
    { canRespond: true, currentUserResponseCompleted: true, respondFrom: yesterday, expectedClass: 'success' },
    { canRespond: false, currentUserResponseCompleted: false, respondFrom: yesterday, expectedClass: 'default' },
    { canRespond: false, currentUserResponseCompleted: false, respondFrom: tomorrow, expectedClass: 'default' },
    { canRespond: false, currentUserResponseCompleted: true, respondFrom: yesterday, expectedClass: 'success' }
  ];

  scenarios.forEach(({ canRespond, currentUserResponseCompleted, respondFrom, expectedClass }) => {
    this.set('form', EmberObject.create({ canRespond, currentUserResponseCompleted, respondFrom }));
    component.render(hbs`{{form/status-tag form}}`);

    assert.equal(component.hasDefaultClass, expectedClass === 'default');
    assert.equal(component.hasInfoClass, expectedClass === 'info');
    assert.equal(component.hasSuccessClass, expectedClass === 'success');
    assert.equal(component.hasDangerClass, expectedClass === 'danger');
  });
});
