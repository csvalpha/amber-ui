import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class ArticlesIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'created_at';
  @tracked sortedAscending = false;

  queryParams = ['search', 'sort', 'page'];

  routeOnEnter = 'articles.article';
  sortableAttributes = [
    {
      value: 'title',
      label: 'Titel',
    },
    {
      value: 'created_at',
      label: 'Aangemaakt op',
    },
  ];
}
