import DestroyController from 'amber-ui/controllers/application/destroy';

export default class ArticleDestroyController extends DestroyController {
  successTransitionTarget = 'articles.index';
  cancelTransitionTarget = 'articles.show';
}
