import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// TODO test user input (enter some text and see if model property changes)

const MockModel = EmberObject.extend({
  testProperty: 'https://csvalpha.nl/public/test.png',
  errors: EmberObject.create({})
});

moduleForComponent('model-form/file-input', 'Integration | Component | model form/file input', {
  integration: true,
  beforeEach() {
    this.set('model', MockModel.create());
  }
});

test('it shows the current model property value', function(assert) {
  this.render(hbs`{{model-form/file-input model=model property='testProperty'}}`);
  assert.equal(this.$('img').prop('src').trim(), 'https://csvalpha.nl/public/test.png');
});

test('it uses the given element id', function(assert) {
  this.render(hbs`{{model-form/file-input model=model property='testProperty' inputIdentifier='a-very-cool-id'}}`);
  const id = this.$('img').attr('id');
  assert.equal(id, 'a-very-cool-id');
});

test('it shows the given label', function(assert) {
  this.render(hbs`{{model-form/file-input model=model property='testProperty' label='TESTLABEL'}}`);
  assert.equal(this.$('label').text().trim(), 'TESTLABEL');
});

test('it uses the given label as image alternative text', function(assert) {
  this.render(hbs`{{model-form/file-input model=model property='testProperty' label='TESTLABEL'}}`);
  assert.equal(this.$('img').prop('alt').trim(), 'TESTLABEL');
});

test('it adds an asterix (*) to the label when the property is required', function(assert) {
  this.render(hbs`{{model-form/file-input model=model property='testProperty' required=true label='TESTLABEL'}}`);
  assert.equal(this.$('label').text().trim(), 'TESTLABEL *');
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
  this.render(hbs`{{model-form/file-input model=model property='testProperty'}}`);
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
  this.render(hbs`{{model-form/file-input model=model property='testProperty'}}`);
  assert.equal(this.$('.invalid-feedback div').length, 2);
  assert.equal(this.$(this.$('.invalid-feedback div')[0]).text().trim(), 'test error 1');
  assert.equal(this.$(this.$('.invalid-feedback div')[1]).text().trim(), 'test error 2');
});

