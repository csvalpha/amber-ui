import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// TODO test user input (enter some text and see if model property changes)

const MockModel = EmberObject.extend({
  testProperty: true,
  errors: EmberObject.create({})
});

moduleForComponent('model-form/checkbox-input', 'Integration | Component | model form/checkbox input', {
  integration: true,
  beforeEach() {
    this.set('model', MockModel.create());
  }
});

test('it shows the current model property value', function(assert) {
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty'}}`);
  assert.ok(this.$('input').prop('checked'));

  this.set('model', MockModel.create({ testProperty: false }));
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty'}}`);
  assert.notOk(this.$('input').prop('checked'));
});

test('it uses the given element id', function(assert) {
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty' inputIdentifier='a-very-cool-id'}}`);
  const id = this.$('input').attr('id');
  assert.equal(id, 'a-very-cool-id');
});

test('it shows the given label', function(assert) {
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty' label='TESTLABEL'}}`);
  assert.equal(this.$('label').text().trim(), 'TESTLABEL');
});

test('it has the checkbox type by default', function(assert) {
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty'}}`);
  assert.equal(this.$('input').attr('type'), 'checkbox');
});

test('it makes the input element disabled', function(assert) {
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty'}}`);
  assert.notOk(this.$('input').prop('disabled'));
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty' disabled=true}}`);
  assert.ok(this.$('input').prop('disabled'));
});

test('it makes the input element required when the property is required', function(assert) {
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty'}}`);
  assert.notOk(this.$('input').attr('required'));
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty' required=true}}`);
  assert.ok(this.$('input').attr('required'));
});

test('it adds an asterix (*) to the label when the property is required', function(assert) {
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty' required=true label='TESTLABEL'}}`);
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
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty'}}`);
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
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty'}}`);
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
  this.render(hbs`{{model-form/checkbox-input model=model property='testProperty'}}`);
  assert.equal(this.$('.invalid-feedback div').length, 2);
  assert.equal(this.$(this.$('.invalid-feedback div')[0]).text().trim(), 'test error 1');
  assert.equal(this.$(this.$('.invalid-feedback div')[1]).text().trim(), 'test error 2');
});
