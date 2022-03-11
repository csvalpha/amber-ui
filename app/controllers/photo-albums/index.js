import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class PhotoAlbumsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'date';
  @tracked sortedAscending = false;

  queryParams = ['search', 'sort', 'page'];
  sortableAttributes = [
    {
      value: 'title',
      label: 'Titel',
    },
    {
      value: 'date',
      label: 'Datum',
    },
    {
      value: 'created_at',
      label: 'Toegevoegd',
    },
  ];
}
