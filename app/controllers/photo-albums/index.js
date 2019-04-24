import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';
import PagedModelControllerMixin from 'alpha-amber/mixins/paged-model-controller-mixin';

export default Controller.extend(FilterableAndSortableMixin, PagedModelControllerMixin, {
  queryParams: ['search', 'sort', 'page'],
  sortableAttributes: [
    {
      value: 'title',
      label: 'Titel'
    },
    {
      value: 'date',
      label: 'Datum'
    },
    {
      value: 'created_at',
      label: 'Toegevoegd'
    }
  ],
  sortedAttribute: 'date',
  sortedAscending: false
});
