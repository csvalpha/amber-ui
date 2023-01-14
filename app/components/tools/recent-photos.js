import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class RecentPhotos extends Component {
  @service store;

  photosWithComments = [];
  albums = [];

  constructor() {
    super(...arguments);

    /* eslint-disable camelcase */
    this.photosWithComments = this.store.query('photo', {
      sort: '-updated_at',
      filter: { with_comments: true },
      page: { number: '1', size: 4 },
    });
    /* eslint-enable camelcase */

    this.albums = this.store.query('photo-album', {
      sort: '-date',
      page: { number: '1', size: 3 },
    });
  }
}
