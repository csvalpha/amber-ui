import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';

export default Controller.extend(FilterableAndSortableMixin, {
  queryParams: ['search', 'sort', 'page'],
  routeOnEnter: 'activities.show',
  sortableAttributes: [
    {
      value: 'title',
      label: 'Titel'
    },
    {
      value: 'start_time',
      label: 'Begindatum'
    }
  ],
  sortedAttribute: 'start_time',
  showPassed: false
});
