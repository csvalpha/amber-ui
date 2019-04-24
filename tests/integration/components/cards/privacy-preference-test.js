import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { create } from 'ember-cli-page-object';
import component from 'alpha-amber/tests/pages/components/cards/privacy-preference';
import startMirage from 'alpha-amber/tests/helpers/setup-mirage-for-integration';
import { UserDetailsPreferenceTypes, PicturePublicationPreferenceTypes } from 'alpha-amber/constants';

let privacyPreferenceCard;

moduleForComponent('cards/privacy-preference', 'Integration | Component | privacy preference', {
  integration: true,
  beforeEach() {
    startMirage(this.container);
    privacyPreferenceCard = create(component);
    privacyPreferenceCard.setContext(this);
  },
  afterEach() {
    privacyPreferenceCard.removeContext();
    window.server.shutdown();
  }
});

test('it displays the privacy preference of a user', function(assert) {
  const user = EmberObject.create(server.create('user').attrs);
  this.set('user', user);

  privacyPreferenceCard.render(hbs`{{cards/privacy-preference user}}`);

  assert.equal(privacyPreferenceCard.userDetailsSharingPreference,
    UserDetailsPreferenceTypes[user.get('userDetailsSharingPreference')], 'userDetailsSharingPreference');
  assert.equal(privacyPreferenceCard.ifesDataSharingPreference,
    user.get('ifesDataSharingPreference') ? 'Ja' : 'Nee', 'ifesDataSharingPreference');
  assert.equal(privacyPreferenceCard.infoInAlmanak,
    user.get('infoInAlmanak') ? 'Ja' : 'Nee', 'infoInAlmanak');
});
