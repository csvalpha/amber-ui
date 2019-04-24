import { moduleForComponent, test } from 'ember-qunit';
import component from 'alpha-amber/tests/pages/components/input/time-input';
import hbs from 'htmlbars-inline-precompile';
import { create } from 'ember-cli-page-object';

let page;

moduleForComponent('input/time-input', 'Integration | Component | input/time input', {
  integration: true,
  beforeEach() {
    page = create(component);
    page.setContext(this);
    this.set('dateValue', new Date());
  },
  afterEach() {
    page.removeContext();
  }
});

test('it shows the value', function(assert) {
  page.render(hbs`{{input/time-input dateValue=dateValue}}`);

  const dateValue = moment(this.get('dateValue'));
  assert.equal(dateValue.format('HH:mm'), page.value);
});

test('it updates the value when filling in a time', function(assert) {
  page.render(hbs`{{input/time-input dateValue=dateValue}}`);

  const oldDate = moment(this.get('dateValue'));
  const newDate = oldDate.clone().hour(2).minute(18);

  page.fillInValue(newDate.format('HH:mm'));

  const updatedDate = moment(this.get('dateValue'));
  assert.ok(updatedDate.isSame(newDate), `${updatedDate.format()} != ${newDate.format()}`);
});
