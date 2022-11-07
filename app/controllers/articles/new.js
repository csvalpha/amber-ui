import ArticleEditController from './article/edit';

export default class ArticlesNewController extends ArticleEditController {
  successMessage = 'Artikel aangemaakt!';
  cancelMessage = 'Artikel aanmaken geannuleerd.';
  cancelTransitionTarget = 'articles';
  cancelTransitionModel = null;
}
