import GroupEditController from './group/edit';

export default class GroupsNewController extends GroupEditController {
  successMessage = 'Groep aangemaakt!';
  cancelMessage = 'Groep aanmaken geannuleerd.';
  cancelTransitionTarget = 'groups';
  cancelTransitionModel = null;
}
