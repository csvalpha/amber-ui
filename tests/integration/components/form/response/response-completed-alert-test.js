import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import componentPageObject from 'alpha-amber/tests/pages/components/form/response/response-completed-alert';
import { create } from 'ember-cli-page-object';

let component;

moduleForComponent('form/response/response-completed-alert', 'Integration | Component | form/response/response completed alert', {
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
  canRespond: true,
  respondFrom: moment().subtract(4, 'days').toDate(),
  respondUntil: moment().add(7, 'days').toDate()
});

test('it renders with a button when form is still open', function(assert) {
  this.set('form', mockForm.create());
  component.render(hbs`{{form/response/response-completed-alert form}}`);

  assert.equal(component.alertTextStrong, 'Je bent ingeschreven!');
  assert.equal(component.alertText, 'Deze inschrijflijst sluit over 7 dagen');
  assert.ok(component.destroyResponseButtonIsVisible);
});

test('it renders without a button when form is closed', function(assert) {
  this.set('form', mockForm.create({
    canRespond: false,
    respondUntil: moment().subtract(2, 'days').toDate()
  }));
  component.render(hbs`{{form/response/response-completed-alert form}}`);

  assert.equal(component.alertTextStrong, 'Je bent ingeschreven!');
  assert.equal(component.alertText, 'Deze inschrijflijst sloot 2 dagen geleden');
  assert.notOk(component.destroyResponseButtonIsVisible);
});
