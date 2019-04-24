import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  amountOfAlbumsToShow: 4,
  store: service(),
  photoAlbums: computed(function() {
    return this.get('store').query('photo-album', { sort: '-updated_at', page: { number: '1', size: this.get('amountOfAlbumsToShow') } });
  })
});
