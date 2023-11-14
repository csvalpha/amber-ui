import BookEditController from './book/edit';

export default class BooksNewController extends BookEditController {
  successMessage = 'Aanmaken gelukt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'books';
  cancelTransitionModel = null;
}
