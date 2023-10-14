import EditIndexController from './user/edit';

export default class UsersNewController extends EditIndexController {
  successMessage = 'Gebruiker aangemaakt!';
  cancelMessage = 'Gebruiker aanmaken geannuleerd.';
  cancelTransitionTarget = 'users';
  cancelTransitionModel = null;
}
