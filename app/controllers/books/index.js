import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class BooksIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'author';

  queryParams = ['search', 'sort', 'page'];

  routeOnEnter = 'books.book';
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
