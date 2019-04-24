import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';
import PagedModelControllerMixin from 'alpha-amber/mixins/paged-model-controller-mixin';

export default Controller.extend(FilterableAndSortableMixin, PagedModelControllerMixin, {
  routeOnEnter: 'debit.collections.show',
  queryParams: ['search', 'sort'],
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
