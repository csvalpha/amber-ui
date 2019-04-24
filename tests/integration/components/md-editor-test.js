import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-editor', 'Integration | Component | md editor', {
  integration: true
});

test('it renders with content', function(assert) {
  assert.expect(2);

  this.set('value', 'foo');

  this.render(hbs`
    <div id="ember-wormhole-destination"></div>
    {{md-editor content=value}}`);
  assert.equal(this.$('textarea').val(), 'foo', 'content starts as foo');

  this.set('value', 'bar');

  assert.equal(this.$('textarea').val(), 'bar', 'content updates to bar');
});

// TODO: Complete testing, not necessary if this component is replaced
