import EditUserController from './edit';

export default class NewUserController extends EditUserController {
  successMessage = 'Gebruiker aangemaakt!';
  cancelMessage = 'Gebruiker aanmaken geannuleerd.';
  cancelTransitionTarget = 'users.index';
  get cancelTransitionModel() {
    return null;
  }
}
