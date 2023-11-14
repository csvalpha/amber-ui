import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class MandatesIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'start_date';
  @tracked sortedAscending = false;

  queryParams = ['search', 'sort', 'page'];

  routeOnEnter = 'debit.mandates.mandate';
  sortableAttributes = [
    {
      value: 'start_date',
      label: 'Begindatum',
    },
    {
      value: 'id',
      label: 'ID',
    },
  ];
}
