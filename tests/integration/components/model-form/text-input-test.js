import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// TODO test user input (enter some text and see if model property changes)

const MockModel = EmberObject.extend({
  testProperty: 'test value',
  errors: EmberObject.create({})
});

moduleForComponent('model-form/text-input', 'Integration | Component | model form/text input', {
  integration: true,
  beforeEach() {
    this.set('model', MockModel.create());
  }
});

test('it shows the current model property value', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty'}}`);
  assert.equal(this.$('input').val().trim(), 'test value');
});

test('it uses the same default id for the input and label', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty'}}`);
  const id = this.$('input').attr('id');
  assert.equal(id, this.$('label').attr('for'));
});

test('it uses the given element id', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty' inputIdentifier='a-very-cool-id'}}`);
  const id = this.$('input').attr('id');
  assert.equal(id, 'a-very-cool-id');
  assert.equal(id, this.$('label').attr('for'));
});

test('it shows the given label', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty' label='TESTLABEL'}}`);
  assert.equal(this.$('label').text().trim(), 'TESTLABEL');
});

test('it has the text type by default', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty'}}`);
  assert.equal(this.$('input').attr('type'), 'text');
});

test('it has the given type', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty' type='email'}}`);
  assert.equal(this.$('input').attr('type'), 'email');
});

test('it makes the input element disabled', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty'}}`);
  assert.notOk(this.$('input').prop('disabled'));
  this.render(hbs`{{model-form/text-input model=model property='testProperty' disabled=true}}`);
  assert.ok(this.$('input').prop('disabled'));
});

test('it makes the input element required when the property is required', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty'}}`);
  assert.notOk(this.$('input').attr('required'));
  this.render(hbs`{{model-form/text-input model=model property='testProperty' required=true}}`);
  assert.ok(this.$('input').attr('required'));
});

test('it adds an asterix (*) to the label when the property is required', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty' required=true label='TESTLABEL'}}`);
  assert.equal(this.$('label').text().trim(), 'TESTLABEL *');
});

test('it uses the label as placeholder if no placeholder is given', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty' label='TESTLABEL'}}`);
  assert.equal(this.$('input').attr('placeholder').trim(), 'TESTLABEL');
});

test('it uses the given placeholder', function(assert) {
  this.render(hbs`{{model-form/text-input model=model property='testProperty' label='TESTLABEL' placeholder='TESTPLACEHOLDER'}}`);
  assert.equal(this.$('input').attr('placeholder').trim(), 'TESTPLACEHOLDER');
});

test('it has the is-invalid class when the model has errors', function(assert) {
  this.set('model', MockModel.create({
    errors: EmberObject.create({
      testProperty: [
        'test error'
      ]
    })
  }));
  this.render(hbs`{{model-form/text-input model=model property='testProperty'}}`);
  assert.ok(this.$('input').hasClass('is-invalid'));
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
  this.render(hbs`{{model-form/text-input model=model property='testProperty'}}`);
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
  this.render(hbs`{{model-form/text-input model=model property='testProperty'}}`);
  assert.equal(this.$('.invalid-feedback div').length, 2);
  assert.equal(this.$(this.$('.invalid-feedback div')[0]).text().trim(), 'test error 1');
  assert.equal(this.$(this.$('.invalid-feedback div')[1]).text().trim(), 'test error 2');
});
