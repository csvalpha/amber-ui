import EditMandateController from './mandate/edit';

export default class MandatesNewController extends EditMandateController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'debit.mandates';
  cancelTransitionModel = null;
}
