import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';

export default Controller.extend(FilterableAndSortableMixin, {
  routeOnEnter: 'debit.mandates.show',
  queryParams: ['search', 'sort', 'page'],
  sortedAttribute: 'start_date',
  sortedAscending: false,
  sortableAttributes: [
    {
      value: 'start_date',
      label: 'Begindatum'
    },
    {
      value: 'id',
      label: 'ID'
    }
  ]
});
