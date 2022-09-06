import EditActivityController from './edit';

export default class NewActivityController extends EditActivityController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'activities.index';
  cancelTransitionModel = null;
}
