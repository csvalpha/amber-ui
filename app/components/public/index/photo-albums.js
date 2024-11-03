import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class Photos extends Component {
  @service store;
  @tracked doubleActivityColumns;
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
