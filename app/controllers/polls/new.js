import PollEditController from './poll/edit';

export default class PollsNewController extends PollEditController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'polls';
  cancelTransitionModel = null;
}
