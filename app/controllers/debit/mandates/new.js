import MandateEditController from './mandate/edit';

export default class MandatesNewController extends MandateEditController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'debit.mandates';
  cancelTransitionModel = null;
}
