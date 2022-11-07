import EditArticleController from './article/edit';

export default class NewArticleController extends EditArticleController {
  successMessage = 'Artikel aangemaakt!';
  cancelMessage = 'Artikel aanmaken geannuleerd.';
  cancelTransitionTarget = 'articles';
  cancelTransitionModel = null;
}
