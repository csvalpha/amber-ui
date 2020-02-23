import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Component | poll/status tag', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it displays the status correctly', function(assert) {
    const component = this.owner.lookup('component:poll/status_tag');

    assert.equal(component.get('content'), 'laden...', 'without form displays laden');
    assert.equal(component.get('colorIndicatorClass'), 'badge-success', 'without form has badge-succes class');

    const formCanRespond = EmberObject.create(this.server.create('formForm').attrs);
    component.set('form', formCanRespond);
    assert.equal(component.get('content'), 'Open', 'can respond');
    assert.equal(component.get('colorIndicatorClass'), 'badge-info', 'can respond has badge-info class');

    const formOpensLater = EmberObject.create(this.server.create('formForm', 'opensLater').attrs);
    component.set('form', formOpensLater);
    assert.equal(component.get('content'), 'Opent later', 'opens later');
    assert.equal(component.get('colorIndicatorClass'), 'badge-default', 'opens later has badge-default class');

    const formClosed = EmberObject.create(this.server.create('formForm', 'closed').attrs);
    component.set('form', formClosed);
    assert.equal(component.get('content'), 'Gesloten', 'is closed');
    assert.equal(component.get('colorIndicatorClass'), 'badge-default', 'is closed has badge-default class');

    const formResponseCompleted = EmberObject.create(this.server.create('formForm', { currentUserResponseCompleted: true }).attrs);
    component.set('form', formResponseCompleted);
    assert.equal(component.get('content'), 'Ingevuld', 'response completed');
    assert.equal(component.get('colorIndicatorClass'), 'badge-success', 'response completed has badge-success class');
  });

});


