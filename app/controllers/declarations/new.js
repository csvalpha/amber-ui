import EditController from 'amber-ui/controllers/application/edit';

export default class DeclarationsNewController extends EditController {
  successMessage = 'Declaratie ingediend! De questor gaat ermee aan de slag.';
  cancelMessage = 'Declaratie indienen geannuleerd.';
  successTransitionTarget = 'declarations.declaration';
  cancelTransitionTarget = 'declarations';
  cancelTransitionModel = null;
}
