import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  photoSorting: ['-createdAt'],
  sortedPhotos: sort('model.photos', 'photoSorting')
});
