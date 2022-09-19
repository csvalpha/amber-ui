import EditArticleController from './edit';

export default class NewArticleController extends EditArticleController {
  cancelTransitionTarget = 'articles.index';
  cancelTransitionModel = null;
  successMessage = 'Artikel aangemaakt!';
  cancelMessage = 'Artikel aanmaken geannuleerd.';
}
