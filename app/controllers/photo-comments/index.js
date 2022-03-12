import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PhotoCommentsIndexController extends FilterableAndSortableController {
  @service('flash-notice') flashNotice;

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
}
