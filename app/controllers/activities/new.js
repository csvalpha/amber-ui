import ActivityEditController from './activity/edit';

export default class ActivitiesNewController extends ActivityEditController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'activities';
  cancelTransitionModel = null;
}
