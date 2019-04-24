import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('humanize-picture-publication-preference', 'helper:humanize-picture-publication-preference', {
  integration: true
});

test('it humanizes the picture publication preference', function(assert) {
  this.set('option', 'always_publish');
  this.render(hbs`{{humanize-picture-publication-preference option}}`);
  assert.equal(this.$().text().trim(), 'Publiceren altijd toegestaan');

  this.set('option', 'always_ask');
  this.render(hbs`{{humanize-picture-publication-preference option}}`);
  assert.equal(this.$().text().trim(), 'Altijd toestemming vragen voor publiceren');

  this.set('option', 'never_publish');
  this.render(hbs`{{humanize-picture-publication-preference option}}`);
  assert.equal(this.$().text().trim(), 'Publiceren nooit toegestaan');
});
