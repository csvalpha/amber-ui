import EditPollController from './edit';

export default class NewPollController extends EditPollController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'polls.index';
  get cancelTransitionModel() {
    return null;
  }
}
