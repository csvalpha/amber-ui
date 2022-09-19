import EditController from './edit';

export default class NewBookController extends EditController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'books.index';
  cancelTransitionModel = null;
}
