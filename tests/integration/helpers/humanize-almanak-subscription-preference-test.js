import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('humanize-almanak-subscription-preference', 'helper:humanize-almanak-subscription-preference', {
  integration: true
});

test('it humanizes the almanak subscription preference', function(assert) {
  this.set('option', 'no_subscription');
  this.render(hbs`{{humanize-almanak-subscription-preference option}}`);
  assert.equal(this.$().text().trim(), 'Geen Almanak');

  this.set('option', 'digital');
  this.render(hbs`{{humanize-almanak-subscription-preference option}}`);
  assert.equal(this.$().text().trim(), 'Digitale uitgave van de Almanak');

  this.set('option', 'physical');
  this.render(hbs`{{humanize-almanak-subscription-preference option}}`);
  assert.equal(this.$().text().trim(), 'Papieren uitgave van de Almanak');
});
