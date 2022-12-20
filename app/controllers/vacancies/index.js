import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class VacancyIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'created_at';
  @tracked sortedAscending = false;

  routeOnEnter = 'vacancies.show';
  queryParams = ['page'];
}
