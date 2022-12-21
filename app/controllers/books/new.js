import EditBookController from './edit';

export default class NewBookController extends EditBookController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'books.index';
  get cancelTransitionModel() {
    return null;
  }
}
