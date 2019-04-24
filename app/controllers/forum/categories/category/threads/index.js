import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';

export default Controller.extend(FilterableAndSortableMixin, {
  routeOnEnter: 'forum.categories.category.threads.thread.show',
  queryParams: ['search', 'sort'],
  sortableAttributes: [
    {
      value: 'updated_at',
      label: 'Laatst gewijzigd'
    },
    {
      value: 'created_at',
      label: 'Aanmaakdatum'
    }
  ],
  sortedAttribute: 'updated_at',
  sortedAscending: false
});
