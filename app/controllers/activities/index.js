import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class ActivitiesIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'start_time';

  queryParams = ['search', 'sort', 'page'];

  routeOnEnter = 'activities.activity';
  sortableAttributes = [
    {
      value: 'title',
      label: 'Titel',
    },
    {
      value: 'start_time',
      label: 'Begindatum',
    },
  ];

  showPassed = false;
}
