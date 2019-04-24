import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('humanize-digtus-subscription-preference', 'helper:humanize-digtus-subscription-preference', {
  integration: true
});

test('it humanizes the almanak subscription preference', function(assert) {
  this.set('option', 'no_subscription');
  this.render(hbs`{{humanize-digtus-subscription-preference option}}`);
  assert.equal(this.$().text().trim(), 'Geen Digtus');

  this.set('option', 'digital');
  this.render(hbs`{{humanize-digtus-subscription-preference option}}`);
  assert.equal(this.$().text().trim(), 'Digitale uitgave van de Digtus');

  this.set('option', 'physical');
  this.render(hbs`{{humanize-digtus-subscription-preference option}}`);
  assert.equal(this.$().text().trim(), 'Papieren uitgave van de Digtus');
});
