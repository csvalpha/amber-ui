import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class ActivitiesIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'start_time';

  queryParams = ['search', 'sort', 'page'];
  routeOnEnter = 'activities.show';
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
