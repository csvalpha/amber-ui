import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';

export default Controller.extend(FilterableAndSortableMixin, {
  routeOnEnter: 'polls.show',
  queryParams: ['search', 'sort', 'page'],
  sortableAttributes: [
    {
      value: 'created_at',
      label: 'Aanmaakdatum'
    }
  ],
  sortedAttribute: 'created_at',
  sortedAscending: false
});
