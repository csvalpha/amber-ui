import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class ThreadsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'updated_at';
  @tracked sortedAscending = false;

  queryParams = ['search', 'sort'];

  routeOnEnter = 'forum.categories.category.threads.thread';
  sortableAttributes = [
    {
      value: 'updated_at',
      label: 'Laatst gewijzigd',
    },
    {
      value: 'created_at',
      label: 'Aanmaakdatum',
    },
  ];
}
