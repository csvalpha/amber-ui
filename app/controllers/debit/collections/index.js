import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';

export default Controller.extend(FilterableAndSortableMixin, {
  routeOnEnter: 'debit.collections.show',
  queryParams: ['search', 'sort', 'page'],
  sortableAttributes: [
    {
      value: 'name',
      label: 'Naam'
    },
    {
      value: 'date',
      label: 'Datum'
    }
  ],
  sortedAttribute: 'date',
  sortedAscending: false
});
