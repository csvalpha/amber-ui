import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';
import PagedModelControllerMixin from 'alpha-amber/mixins/paged-model-controller-mixin';

export default Controller.extend(FilterableAndSortableMixin, PagedModelControllerMixin, {
  routeOnEnter: 'debit.mandates.show',
  queryParams: ['search', 'sort'],
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
