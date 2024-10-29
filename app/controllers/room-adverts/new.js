import RoomAdvertEditController from './room-advert/edit';

export default class RoomAdvertsNewController extends RoomAdvertEditController {
  successMessage = 'Kamer advertentie aangemaakt!';
  cancelMessage = 'Kamer advertentie aanmaken geannuleerd.';
  cancelTransitionTarget = 'room-adverts';
  cancelTransitionModel = null;
}
