import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('humanize-user-details-sharing-preference', 'helper:humanize-user-details-sharing-preference', {
  integration: true
});

test('it humanizes the user details sharing preference', function(assert) {
  this.set('option', 'hidden');
  this.render(hbs`{{humanize-user-details-sharing-preference option}}`);
  assert.equal(this.$().text().trim(), 'Verbergen voor iedereen');

  this.set('option', 'members_only');
  this.render(hbs`{{humanize-user-details-sharing-preference option}}`);
  assert.equal(this.$().text().trim(), 'Alleen delen met leden');

  this.set('option', 'all_users');
  this.render(hbs`{{humanize-user-details-sharing-preference option}}`);
  assert.equal(this.$().text().trim(), 'Delen met leden en oudleden');
});
