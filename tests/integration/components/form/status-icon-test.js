import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import componentPageObject from 'alpha-amber/tests/pages/components/form/status-icon';
import { create } from 'ember-cli-page-object';

let component;

moduleForComponent('form/status-icon', 'Integration | Component | form/status icon', {
  integration: true,
  beforeEach() {
    component = create(componentPageObject);
    component.setContext(this);
  },
  afterEach() {
    component.removeContext();
  }
});

test('it displays a green circle when form is null', function(assert) {
  this.set('form', null);
  component.render(hbs`{{form/status-icon form}}`);

  assert.ok(component.hasSuccessClass);
  assert.notOk(component.hasPrimaryClass);
  assert.notOk(component.hasDarkClass);
  assert.notOk(component.hasWhiteClass);
  assert.notOk(component.hasDangerClass);

  assert.ok(component.hasCircleIconClass);
  assert.notOk(component.hasLockIconClass);
  assert.notOk(component.hasClockIconClass);
});

test('it displays content corresponding to the form', function(assert) {
  const yesterday = new Date((new Date()).valueOf() - (1000 * 3600 * 24));
  const tomorrow = new Date((new Date()).valueOf() + (1000 * 3600 * 24));
  const scenarios = [
    { canRespond: true, currentUserResponseCompleted: false, respondFrom: yesterday, opensLater: false, expectedColor: 'primary', expectedIcon: 'circle' },
    { canRespond: true, currentUserResponseCompleted: true, respondFrom: yesterday, opensLater: false, expectedColor: 'success', expectedIcon: 'circle' },
    { canRespond: false, currentUserResponseCompleted: false, respondFrom: yesterday, opensLater: false, expectedColor: 'dark', expectedIcon: 'lock' },
    { canRespond: false, currentUserResponseCompleted: false, respondFrom: tomorrow, opensLater: true, expectedColor: 'dark', expectedIcon: 'clock' },
    { canRespond: false, currentUserResponseCompleted: true, respondFrom: yesterday, opensLater: false, expectedColor: 'success', expectedIcon: 'lock' }
  ];

  scenarios.forEach(({ canRespond, currentUserResponseCompleted, respondFrom, expectedColor, expectedIcon, opensLater }) => {
    this.set('form', EmberObject.create({ canRespond, currentUserResponseCompleted, respondFrom, opensLater }));
    component.render(hbs`{{form/status-icon form}}`);

    assert.notOk(component.hasDangerClass);
    assert.notOk(component.hasWhiteClass);

    switch (expectedColor) {
      case 'primary':
        assert.ok(component.hasPrimaryClass);
        assert.notOk(component.hasDarkClass);
        assert.notOk(component.hasSuccessClass);
        break;
      case 'success':
        assert.ok(component.hasSuccessClass);
        assert.notOk(component.hasDarkClass);
        assert.notOk(component.hasPrimaryClass);
        break;
      case 'dark':
        assert.ok(component.hasDarkClass);
        assert.notOk(component.hasSuccessClass);
        assert.notOk(component.hasPrimaryClass);
        break;
      default:
    }

    switch (expectedIcon) {
      case 'circle':
        assert.ok(component.hasCircleIconClass);
        assert.notOk(component.hasClockIconClass);
        assert.notOk(component.hasLockIconClass);
        break;
      case 'clock':
        assert.ok(component.hasClockIconClass);
        assert.notOk(component.hasCircleIconClass);
        assert.notOk(component.hasLockIconClass);
        break;
      case 'lock':
        assert.ok(component.hasLockIconClass);
        assert.notOk(component.hasClockIconClass);
        assert.notOk(component.hasCircleIconClass);
        break;
      default:
    }
  });
});
