import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class PollsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'created_at';
  @tracked sortedAscending = false;

  routeOnEnter = 'polls.show';
  queryParams = ['search', 'sort', 'page'];
  sortableAttributes = [
    {
      value: 'created_at',
      label: 'Aanmaakdatum',
    },
  ];
}
