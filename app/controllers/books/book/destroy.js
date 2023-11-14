import DestroyController from 'amber-ui/controllers/application/destroy';

export default class BookDestroyController extends DestroyController {
  successTransitionTarget = 'books';
  cancelTransitionTarget = 'books.book';
}
