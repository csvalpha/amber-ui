import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RoomAdvertEditController extends EditController {
  @service abilities;
  @service session;

  successMessage = 'Kamer advertentie opgeslagen!';
  successTransitionTarget = 'room-adverts.room-advert';

  @action
  coverPhotoLoaded(file) {
    const roomAdvert = this.model;
    roomAdvert.set('coverPhoto', file.data);
  }
}
