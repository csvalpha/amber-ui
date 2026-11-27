import EditController from 'amber-ui/controllers/application/edit';

export default class DeclarationEditController extends EditController {
  successMessage = 'Declaratie aangepast!';
  cancelMessage = 'Declaratie aanpassen geannuleerd.';
  successTransitionTarget = 'declarations.declaration';
}
