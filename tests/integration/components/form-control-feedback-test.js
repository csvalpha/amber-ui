import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-control-feedback', 'Integration | Component | form feedback', {
  integration: true
});

test('it renders the errors', function(assert) {
  this.set('errors', [{ message: 'error message' }]);

  this.render(hbs`{{form-control-feedback errors}}`);

  assert.equal(this.$('.invalid-feedback').length, 1);
  assert.equal(this.$('.invalid-feedback').text().trim(), 'error message');
});
