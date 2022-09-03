import EditController from 'amber-ui/controllers/application/edit';

export default class NewController extends EditController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = null;  // default should not be successTransitionTarget, in contrast to the edit controller
  cancelTransitionModel = null;
}
