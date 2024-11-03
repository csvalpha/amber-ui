import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class RoomAdvertsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'created_at';
  @tracked sortedAscending = false;

  queryParams = ['page', 'sort'];

  routeOnEnter = 'room-adverts.room-advert';
}
