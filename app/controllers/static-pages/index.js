import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { inject as service } from '@ember/service';
import groupBy from 'ember-group-by';
import { tracked } from '@glimmer/tracking';

export default class StaticPagesIndexController extends FilterableAndSortableController {
  @service session

  @tracked errorMessage = null
  @tracked sortedAttribute = 'title'

  queryParams = ['search', 'sort']
  routeOnEnter = 'static-pages.show'
  sortableAttributes = [
    {
      value: 'title',
      label: 'Titel'
    }
  ]

  groupedModel = groupBy('model', 'category')
}
