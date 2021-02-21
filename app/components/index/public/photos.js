import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default class Photos extends Component {
  amountOfAlbumsToShow = 4;
  @service store;
  photoAlbums = [];

  constructor() {
    super(...arguments);

    const albums = this.store.query('photo-album', {
      sort: '-updated_at',
      page: { number: '1', size: this.amountOfAlbumsToShow }
    });
    this.set('photoAlbums', albums);
  }
}
