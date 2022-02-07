import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class ThreadsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'updated_at'
  @tracked sortedAscending = false

  routeOnEnter = 'forum.categories.category.threads.thread.show'
  queryParams = ['search', 'sort']
  sortableAttributes = [
    {
      value: 'updated_at',
      label: 'Laatst gewijzigd'
    },
    {
      value: 'created_at',
      label: 'Aanmaakdatum'
    }
  ]
}
