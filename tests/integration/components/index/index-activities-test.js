import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import componentPageObject from 'alpha-amber/tests/pages/components/index/index-activities';
import startMirage from 'alpha-amber/tests/helpers/setup-mirage-for-integration';
import { create } from 'ember-cli-page-object';

let component;

moduleForComponent('index/index-activities', 'Integration | Component | index/index activities', {
  integration: true,
  beforeEach() {
    startMirage(this.container);
    component = create(componentPageObject);
    component.setContext(this);
  },
  afterEach() {
    component.removeContext();
    window.server.shutdown();
  }
});

test('it renders the activities', function(assert) {
  this.set('activities', server.createList('activity', 9));

  component.render(hbs`{{index/index-activities activities=activities}}`);

  assert.equal(component.title, 'Voor wie gelooft in een studententijd!');
  assert.equal(component.activities().count, 9);
});

test('it renders the title when there are no activities', assert => {
  component.render(hbs`{{index/index-activities}}`);

  assert.equal(component.title, 'Voor wie gelooft in een studententijd!');
  assert.equal(component.activities().count, 0);
});
