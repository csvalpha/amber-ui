import { moduleForComponent, test } from 'ember-qunit';
import component from 'alpha-amber/tests/pages/components/input/date-input';
import hbs from 'htmlbars-inline-precompile';
import { create } from 'ember-cli-page-object';

let page;

moduleForComponent('input/date-input', 'Integration | Component | input/date input', {
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

// The PikadayInput component is already tested. Here, we only test changes to the component

test('it display the value using the custom format when using pikaday', function(assert) {
  page.render(hbs`{{input/date-input dateValue=dateValue showNativeDateInput=false}}`);

  const date = moment(this.get('dateValue'));
  assert.equal(page.value, date.format('DD-MM-YYYY'));
});

test('it updates the value when selecting a date using pikaday', function(assert) {
  page.render(hbs`{{input/date-input dateValue=dateValue showNativeDateInput=false}}`);

  const oldDate = moment(this.get('dateValue'));
  const newDate = oldDate.clone().year(2010).month(1).date(18);

  page.fillInCustomDatepicker(newDate.toDate());

  const updatedDate = moment(this.get('dateValue'));
  assert.ok(updatedDate.isSame(newDate), `${updatedDate.format()} != ${newDate.format()}`);
});

test('it shows the value when using the native date picker', function(assert) {
  page.render(hbs`{{input/date-input dateValue=dateValue showNativeDateInput=true}}`);

  const dateValue = moment(this.get('dateValue'));
  assert.equal(dateValue.format('YYYY-MM-DD'), page.value);
});

test('it updates the value when filling in a date using the native date picker', function(assert) {
  page.render(hbs`{{input/date-input dateValue=dateValue showNativeDateInput=true}}`);

  const oldDate = moment(this.get('dateValue'));
  const newDate = oldDate.clone().year(2010).month(1).date(18);

  page.fillInValue(newDate.format('YYYY-MM-DD'));

  const updatedDate = moment(this.get('dateValue'));
  assert.ok(updatedDate.isSame(newDate), `${updatedDate.format()} != ${newDate.format()}`);
});
