import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';
import groupBy from 'ember-group-by';

export default Controller.extend(FilterableAndSortableMixin, {
  session: service('session'),
  queryParams: ['search', 'sort'],
  errorMessage: null,
  routeOnEnter: 'static-pages.show',
  sortableAttributes: [
    {
      value: 'title',
      label: 'Titel'
    }
  ],
  sortedAttribute: 'title',
  groupedModel: groupBy('model', 'category')
});
