import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class ArticlesIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'created_at';
  @tracked sortedAscending = false;

  routeOnEnter = 'articles.show';
  queryParams = ['search', 'sort', 'page'];
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
