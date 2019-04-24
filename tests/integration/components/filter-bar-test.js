import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filter-bar', 'Integration | Component | filter bar', {
  integration: true
});

test('it displays correctly', function(assert) {
  assert.expect(1);

  this.render(hbs`{{filter-bar filter=filter sortedAttribute=sortedAttribute sortableAttributes=sortableAttributes sortedAscending=sortedAscending}}`);

  this.set('filter', 'test');
  this.set('sortableAttributes', [
    {
      value: 'test1',
      label: 'A'
    },
    {
      value: 'test2',
      label: 'B'
    }
  ]);
  this.set('sortedAttribute', 'test2');
  this.set('sortedAscending', true);

  assert.equal(document.querySelector('.filter-bar-filter').value, 'test', 'Filter value is set');
});
