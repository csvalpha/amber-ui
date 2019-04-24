import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import component from 'alpha-amber/tests/pages/components/model-form/radio-group';
import { create } from 'ember-cli-page-object';

let page;
const MockModel = EmberObject.extend({
  testProperty: null,
  errors: EmberObject.create({})
});
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

moduleForComponent('model-form/radio-group', 'Integration | Component | model form/radio group', {
  integration: true,
  beforeEach() {
    page = create(component);
    page.setContext(this);
    this.set('model', MockModel.create());
    this.set('options', options);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it lists all given options', (assert) => {
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options}}`);
  assert.equal(page.options().count, 3);
  assert.equal(page.options(0).label, 'Option 1');
  assert.equal(page.options(0).value, 1);
  assert.equal(page.options(1).label, 'Option 2');
  assert.equal(page.options(1).value, 2);
  assert.equal(page.options(2).label, 'Option 3');
  assert.equal(page.options(2).value, 3);
});

test('it shows the current model property value', function(assert) {
  this.set('model', MockModel.create({
    testProperty: 3
  }));
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options}}`);
  assert.notOk(page.options(0).checked);
  assert.notOk(page.options(1).checked);
  assert.ok(page.options(2).checked);
});

test('it uses the same default name for all input items', (assert) => {
  assert.expect(2);
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options}}`);
  const name = page.options(0).inputName;
  [1, 2].forEach(i => {
    assert.equal(name, page.options(i).inputName);
  });
});

test('it uses the same default id for the input and label', (assert) => {
  assert.expect(3);
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options}}`);
  [0, 1, 2].forEach(i => {
    assert.equal(page.options(i).labelFor, page.options(i).inputId);
  });
});

test('it uses the given element id', (assert) => {
  assert.expect(9);
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options inputIdentifier='a-very-cool-id'}}`);
  [0, 1, 2].forEach(i => {
    assert.equal(page.options(i).inputName, 'a-very-cool-id');
    assert.equal(page.options(i).inputId, `a-very-cool-id-${page.options(i).value}`);
    assert.equal(page.options(i).labelFor, page.options(i).inputId);
  });
});

test('it shows the given label', (assert) => {
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' label='TESTLABEL'}}`);
  assert.equal(page.label, 'TESTLABEL');
});

test('it makes the input elements disabled', (assert) => {
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options}}`);
  [0, 1, 2].forEach(i => {
    assert.notOk(page.options(i).disabled);
  });
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options disabled=true}}`);
  [0, 1, 2].forEach(i => {
    assert.ok(page.options(i).disabled);
  });
});

test('it makes the input elements required when the property is required', (assert) => {
  assert.expect(3);
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options required=true}}`);
  [0, 1, 2].forEach(i => {
    assert.ok(page.options(i).required);
  });
});

test('it adds an asterix (*) to the label when the property is required', (assert) => {
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' required=true label='TESTLABEL'}}`);
  assert.equal(page.label, 'TESTLABEL *');
});

test('it has the is-invalid class when the model has errors', function(assert) {
  this.set('model', MockModel.create({
    errors: EmberObject.create({
      testProperty: [
        'test error'
      ]
    })
  }));
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options}}`);

  assert.ok(page.isInvalid);
});

test('it shows the errors when the models has errors', function(assert) {
  this.set('model', MockModel.create({
    errors: EmberObject.create({
      testProperty: [
        {
          message: 'test error'
        }
      ]
    })
  }));
  page.render(hbs`{{model-form/radio-group model=model property='testProperty'}}`);
  assert.equal(page.errors().count, 1);
  assert.equal(page.errors(0).text, 'test error');

  this.set('model', MockModel.create({
    errors: EmberObject.create({
      testProperty: [
        {
          message: 'test error 1'
        }, {
          message: 'test error 2'
        }
      ]
    })
  }));
  page.render(hbs`{{model-form/radio-group model=model property='testProperty'}}`);
  assert.equal(page.errors().count, 2);
  assert.equal(page.errors(0).text, 'test error 1');
  assert.equal(page.errors(1).text, 'test error 2');
});

test('it sets the current model property value', function(assert) {
  this.set('model', MockModel.create({
    testProperty: 2
  }));
  page.render(hbs`{{model-form/radio-group model=model property='testProperty' options=options}}`);
  assert.equal(this.get('model.testProperty'), 2);

  page.options(0).check();
  assert.equal(this.get('model.testProperty'), 1);

  page.options(2).check();
  assert.equal(this.get('model.testProperty'), 3);
});
