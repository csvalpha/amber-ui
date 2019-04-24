import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import component from 'alpha-amber/tests/pages/components/input/select-input';
import { create } from 'ember-cli-page-object';

let selectInputComponent;
const options = [
  {
    value: 1,
    label: 'Option 1'
  }, {
    value: 2,
    label: 'Option 2'
  }, {
    value: 3,
    label: 'Option 3'
  }
];

moduleForComponent('input/select-input', 'Integration | Component | input/select input', {
  integration: true,
  beforeEach() {
    selectInputComponent = create(component);
    selectInputComponent.setContext(this);
    this.set('value', null);
    this.set('options', options);
  },
  afterEach() {
    selectInputComponent.removeContext();
  }
});

test('it lists a placeholder', (assert) => {
  selectInputComponent.render(hbs`{{input/select-input value=value placeholder='test'}}`);
  assert.equal(selectInputComponent.options().count, 1);
  assert.equal(selectInputComponent.options(0).text, 'Selecteer test');
  assert.ok(selectInputComponent.options(0).disabled, 'placholder option should be disabled');
});

test('it uses the given placeholder', (assert) => {
  selectInputComponent.render(hbs`{{input/select-input value=value placeholder='TESTPLACEHOLDER'}}`);
  assert.equal(selectInputComponent.options().count, 1);
  assert.equal(selectInputComponent.options().text, 'Selecteer TESTPLACEHOLDER');
});

test('it lists all given options', (assert) => {
  selectInputComponent.render(hbs`{{input/select-input value=value options=options}}`);
  assert.equal(selectInputComponent.options().count, 4);
  assert.equal(selectInputComponent.options(1).text, 'Option 1');
  assert.equal(selectInputComponent.options(1).value, 1);
  assert.equal(selectInputComponent.options(2).text, 'Option 2');
  assert.equal(selectInputComponent.options(2).value, 2);
  assert.equal(selectInputComponent.options(3).text, 'Option 3');
  assert.equal(selectInputComponent.options(3).value, 3);
});

test('it shows the current value', function(assert) {
  this.set('value', 2);
  selectInputComponent.render(hbs`{{input/select-input value=value options=options}}`);
  assert.equal(selectInputComponent.value, 2);
});

test('it uses the given element id', (assert) => {
  selectInputComponent.render(hbs`{{input/select-input value=value elementId='a-very-cool-id'}}`);
  assert.equal(selectInputComponent.id, 'a-very-cool-id');
});

test('it makes the select element disabled when disabled is true', (assert) => {
  selectInputComponent.render(hbs`{{input/select-input value=value}}`);
  assert.notOk(selectInputComponent.disabled);
  selectInputComponent.render(hbs`{{input/select-input value=value disabled=true}}`);
  assert.ok(selectInputComponent.disabled);
});

test('it makes the select element required when required is true', (assert) => {
  selectInputComponent.render(hbs`{{input/select-input value=value}}`);
  assert.notOk(selectInputComponent.required);
  selectInputComponent.render(hbs`{{input/select-input value=value required=true}}`);
  assert.ok(selectInputComponent.required);
});

test('it updates the value on change', function(assert) {
  this.set('value', 2);
  selectInputComponent.render(hbs`{{input/select-input value=value options=options}}`);
  assert.equal(selectInputComponent.value, 2);

  selectInputComponent.select(1);
  assert.equal(selectInputComponent.value, 1);
  assert.equal(this.get('value'), 1);
});
