import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class CollectionsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'date';
  @tracked sortedAscending = false;

  routeOnEnter = 'debit.collections.show';
  queryParams = ['search', 'sort', 'page'];
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
