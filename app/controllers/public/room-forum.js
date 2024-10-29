import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Modal } from 'bootstrap';

export default class RoomForumController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'created_at';
  @tracked sortedAscending = false;
  @tracked openedAdvert = null;

  queryParams = ['page', 'sort'];

  @action
  openAdvert(advert) {
    this.openedAdvert = advert;
    new Modal('#room-advert-modal', {}).show();
  }

  @action
  removeBackdrops() {
    document.querySelectorAll('.modal-backdrop').forEach((e) => e.remove());
  }
}
