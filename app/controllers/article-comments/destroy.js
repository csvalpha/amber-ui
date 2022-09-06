import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class ArticleCommentDestroyController extends DestroyController {
  successMessage = 'Artikelreactie verwijderd!';
  successTransitionTarget = 'articles.show';
  cancelTransitionTarget = 'articles.show';

  @action
  async destroyModel() {
    this.successTransitionModel = await this.model.article;
    super.destroyModel();
  }

  @action
  async cancel() {
    this.cancelTransitionModel = await this.model.article;
    super.cancel();
  }
}
