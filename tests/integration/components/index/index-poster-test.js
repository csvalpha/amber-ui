import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('index/index-poster', 'Integration | Component | index/index poster', {
  integration: true
});

test('it displays a random image', function(assert) {
  this.render(hbs`{{index/index-poster}}`);
  const backgroundImage = this.$('div').css('background-image');
  assert.ok(backgroundImage.match(/url\(.*\/images\/frontpage\/.+\)/), `'${backgroundImage}' should be a valid background-image value`);
});
