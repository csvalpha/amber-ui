import { moduleForComponent, test } from 'ember-qunit';
import EmberObject from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { create } from 'ember-cli-page-object';
import pageObject from 'alpha-amber/tests/pages/components/users/privacy-settings';
import startMirage from 'alpha-amber/tests/helpers/setup-mirage-for-integration';

let component;

moduleForComponent('users/privacy-settings', 'Integration | Component | users/privacy settings', {
  integration: true,
  beforeEach() {
    startMirage(this.container);
    component = create(pageObject);
    component.setContext(this);
  },
  afterEach() {
    component.removeContext();
    window.server.shutdown();
  }
});

test('it shows the privacy settings of the user', function(assert) {
  const user = EmberObject.create(server.create('user').attrs);
  this.set('user', user);

  component.render(hbs`{{users/privacy-settings model=user}}`);

  assert.equal(component.ifesDataSharingPreferenceValue, user.ifesDataSharingPreference, 'ifesDataSharingPreference');
  assert.equal(component.infoInAlmanakValue, user.infoInAlmanak, 'infoInAlmanak');
});
