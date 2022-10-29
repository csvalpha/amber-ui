import EditGroupController from './edit';

export default class NewGroupController extends EditGroupController {
  successMessage = 'Groep aangemaakt!';
  cancelMessage = 'Groep aanmaken geannuleerd.';
  cancelTransitionTarget = 'groups.index';
  get cancelTransitionModel() {
    return null;
  }
}
