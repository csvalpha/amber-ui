import Component from '@ember/component';

export default Component.extend({
  filter: null,
  classNames: ['d-none d-md-flex'],
  sortedAttribute: null,
  sortableAttributes: null,
  sortedAscending: null,
  didInsertElement() {
    this._super(...arguments);
    this.set('filter', '');
  }
});
