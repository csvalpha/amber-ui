import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default class Photos extends Component {
  @service store;
  photoAlbums = [];

  constructor() {
    super(...arguments);

    const albums = this.store.query('photo-album', {
      sort: '-updated_at',
      page: { number: '1', size: this.amountOfAlbumsToShow },
    });
    this.set('photoAlbums', albums);
  }

  get amountOfAlbumsToShow() {
    return this.doubleActivityColumns ? 2 : 4;
  }
}
