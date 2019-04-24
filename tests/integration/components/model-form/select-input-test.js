import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('model-form/select-input', 'Integration | Component | model form/select input', {
  integration: true
});

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

test('it lists a placeholder', function(assert) {
  this.set('model', MockModel.create());
  this.render(hbs`{{model-form/select-input model=model property='testProperty' placeholder='test'}}`);
  assert.equal(this.$('option').length, 1);
  assert.equal(this.$(this.$('option')[0]).text().trim(), 'Selecteer test');
  assert.ok(this.$(this.$('option')[0]).attr('disabled'), 'placholder option should be disabled');
  // Assert.ok(this.$(this.$('option')[0]).attr('selected'), 'placeholder option should be selected');
});

test('it uses the label as placeholder if no placeholder is given', function(assert) {
  this.set('model', MockModel.create());
  this.render(hbs`{{model-form/select-input model=model property='testProperty' label='TESTLABEL'}}`);
  assert.equal(this.$('option').length, 1);
  assert.equal(this.$(this.$('option')[0]).text().trim(), 'Selecteer TESTLABEL');
});

test('it uses the given placeholder', function(assert) {
  this.set('model', MockModel.create());
  this.render(hbs`{{model-form/select-input model=model property='testProperty' label='TESTLABEL' placeholder='TESTPLACEHOLDER'}}`);
  assert.equal(this.$('option').length, 1);
  assert.equal(this.$(this.$('option')[0]).text().trim(), 'Selecteer TESTPLACEHOLDER');
});

test('it lists all given options', function(assert) {
  this.set('model', MockModel.create());
  this.set('options', options);
  this.render(hbs`{{model-form/select-input model=model property='testProperty' options=options}}`);
  assert.equal(this.$('option').length, 4);
  assert.equal(this.$(this.$('option')[1]).text().trim(), 'Option 1');
  assert.equal(this.$(this.$('option')[1]).val(), 1);
  assert.equal(this.$(this.$('option')[2]).text().trim(), 'Option 2');
  assert.equal(this.$(this.$('option')[2]).val(), 2);
  assert.equal(this.$(this.$('option')[3]).text().trim(), 'Option 3');
  assert.equal(this.$(this.$('option')[3]).val(), 3);
});

test('it shows the current model property value', function(assert) {
  this.set('model', MockModel.create({
    testProperty: 2
  }));
  this.set('options', options);
  this.render(hbs`{{model-form/select-input model=model property='testProperty' options=options}}`);
  assert.equal(this.$('select').val(), 2);
});

test('it uses the same default id for the input and label', function(assert) {
  this.set('model', MockModel.create());
  this.render(hbs`{{model-form/select-input model=model property='testProperty'}}`);
  const id = this.$('select').attr('id');
  assert.equal(id, this.$('label').attr('for'));
});

test('it uses the given element id', function(assert) {
  this.set('model', MockModel.create());
  this.render(hbs`{{model-form/select-input model=model property='testProperty' inputIdentifier='a-very-cool-id'}}`);
  const id = this.$('select').attr('id');
  assert.equal(id, 'a-very-cool-id');
  assert.equal(id, this.$('label').attr('for'));
});

test('it shows the given label', function(assert) {
  this.set('model', MockModel.create());
  this.render(hbs`{{model-form/select-input model=model property='testProperty' label='TESTLABEL'}}`);
  assert.equal(this.$('label').text().trim(), 'TESTLABEL');
});

test('it makes the input element disabled', function(assert) {
  this.render(hbs`{{model-form/select-input model=model property='testProperty'}}`);
  assert.notOk(this.$('select').prop('disabled'));
  this.render(hbs`{{model-form/select-input model=model property='testProperty' disabled=true}}`);
  assert.ok(this.$('select').prop('disabled'));
});

test('it makes the select element required when the property is required', function(assert) {
  this.set('model', MockModel.create());
  this.render(hbs`{{model-form/select-input model=model property='testProperty'}}`);
  assert.notOk(this.$('select').attr('required'));
  this.render(hbs`{{model-form/select-input model=model property='testProperty' required=true}}`);
  assert.ok(this.$('select').attr('required'));
});

test('it adds an asterix (*) to the label when the property is required', function(assert) {
  this.set('model', MockModel.create());
  this.render(hbs`{{model-form/select-input model=model property='testProperty' required=true label='TESTLABEL'}}`);
  assert.equal(this.$('label').text().trim(), 'TESTLABEL *');
});

test('it has the is-invalid class when the model has errors', function(assert) {
  this.set('model', MockModel.create({
    errors: EmberObject.create({
      testProperty: [
        'test error'
      ]
    })
  }));
  this.render(hbs`{{model-form/select-input model=model property='testProperty'}}`);
  assert.ok(this.$('select').hasClass('is-invalid'));
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
  this.render(hbs`{{model-form/select-input model=model property='testProperty'}}`);
  assert.equal(this.$('.invalid-feedback div').length, 1);
  assert.equal(this.$('.invalid-feedback div').text().trim(), 'test error');

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
  this.render(hbs`{{model-form/select-input model=model property='testProperty'}}`);
  assert.equal(this.$('.invalid-feedback div').length, 2);
  assert.equal(this.$(this.$('.invalid-feedback div')[0]).text().trim(), 'test error 1');
  assert.equal(this.$(this.$('.invalid-feedback div')[1]).text().trim(), 'test error 2');
});
