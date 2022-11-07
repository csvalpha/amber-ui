import ActivityEditController from './activity/edit';

export default class ActivityNewController extends ActivityEditController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'activities';
  cancelTransitionModel = null;
}
