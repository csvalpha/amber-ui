import EditMandateController from './edit';

export default class NewMandateController extends EditMandateController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'debit.mandates.index';
  get cancelTransitionModel() {
    return null;
  }
}
