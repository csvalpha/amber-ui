import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class CollectionsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'date';
  @tracked sortedAscending = false;

  queryParams = ['search', 'sort', 'page'];

  routeOnEnter = 'debit.collections.collection';
  sortableAttributes = [
    {
      value: 'name',
      label: 'Naam',
    },
    {
      value: 'date',
      label: 'Datum',
    },
  ];
}
