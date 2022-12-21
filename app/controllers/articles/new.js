import EditArticleController from './edit';

export default class NewArticleController extends EditArticleController {
  successMessage = 'Artikel aangemaakt!';
  cancelMessage = 'Artikel aanmaken geannuleerd.';
  cancelTransitionTarget = 'articles.index';
  get cancelTransitionModel() {
    return null;
  }
}
