import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class MailModerationsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'received_at'

  routeOnEnter = 'mail-moderations.show'
}
