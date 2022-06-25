import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class BookIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'author';

  routeOnEnter = 'books.show';
  queryParams = ['search', 'sort', 'page'];
  sortableAttributes = [
    {
      value: 'title',
      label: 'Titel',
    },
    {
      value: 'author',
      label: 'Auteur',
    },
  ];
}
