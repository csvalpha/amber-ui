import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PhotoCommentsIndexController extends FilterableAndSortableController {
  @service flashNotice;

  @tracked sortedAscending = false;
  @tracked sortedAttribute = 'updated_at';

  routeOnEnter = 'photo-albums.photo-album.photos.show';
  queryParams = ['search', 'sort', 'page'];
  sortableAttributes = [
    {
      value: 'updated_at',
      label: 'Laatste reactie',
    },
  ];

  @action
  selectFirstItem() {
    if (this.routeOnEnter && this.model.length > 0) {
      const routeOnEnterParam = this.routeOnEnterParam || 'id';
      this.transitionToRoute(
        this.routeOnEnter,
        this.model.firstObject.photoAlbum,
        this.model.firstObject[routeOnEnterParam]
      );
    }
  }
}
