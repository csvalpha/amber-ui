import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import componentPageObject from 'alpha-amber/tests/pages/components/form/response/form-closed-alert';
import { create } from 'ember-cli-page-object';

let component;

moduleForComponent('form/response/form-closed-alert', 'Integration | Component | form/response/form closed alert', {
  integration: true,
  beforeEach() {
    component = create(componentPageObject);
    component.setContext(this);
  },
  afterEach() {
    component.removeContext();
  }
});

const mockForm = EmberObject.extend({
  respondFrom: moment().subtract(14, 'days').toDate(),
  respondUntil: moment().subtract(7, 'days').toDate()
});

test('it displays an alert with the correct close period', function(assert) {
  this.set('form', mockForm.create());

  component.render(hbs`{{form/response/form-closed-alert form}}`);
  assert.equal(component.alertTextStrong, 'Je kunt niet reageren!');
  assert.equal(component.alertText, 'Deze inschrijflijst sloot 7 dagen geleden');
});
