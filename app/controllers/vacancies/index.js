import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class VacanciesIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'created_at';
  @tracked sortedAscending = false;

  queryParams = ['page', 'sort'];

  routeOnEnter = 'vacancies.vacancy';
}
