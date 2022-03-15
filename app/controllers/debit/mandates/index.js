import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class MandatesIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'start_date';
  @tracked sortedAscending = false;

  routeOnEnter = 'debit.mandates.show';
  queryParams = ['search', 'sort', 'page'];
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
