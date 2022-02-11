import DestroyController from 'alpha-amber/controllers/application/destroy';

export default class BookDestroyController extends DestroyController {
  successTransitionTarget = 'books.index'
}
