import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RoomEditController extends EditController {
  @service abilities;
  @service session;

  successMessage = 'Kamer advertentie opgeslagen!';
  successTransitionTarget = 'rooms.room';

  @action
  coverPhotoLoaded(file) {
    const room = this.model;
    room.set('coverPhoto', file.data);
  }
}
