import RoomEditController from './room/edit';

export default class RoomsNewController extends RoomEditController {
  successMessage = 'Kamer advertentie aangemaakt!';
  cancelMessage = 'Kamer advertentie aanmaken geannuleerd.';
  cancelTransitionTarget = 'rooms';
  cancelTransitionModel = null;
}
