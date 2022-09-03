import EditController from './edit';

export default class NewGroupController extends EditController {
  successMessage = 'Groep aangemaakt!';
  cancelMessage = 'Groep aanmaken geannuleerd.';
  cancelTransitionTarget = 'groups.index';
  cancelTransitionModel = null;
}
