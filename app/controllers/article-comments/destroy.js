import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class ArticleCommentDestroyController extends DestroyController {
  successMessage = 'Artikelreactie verwijderd!';
  successTransitionTarget = 'articles.show';
  cancelTransitionTarget = 'articles.show';

  get successTransitionModel() {
    return this.article;
  }

  get cancelTransitionModel() {
    return this.article;
  }

  @action
  async destroyModel() {
    this.article = await this.model.article;
    super.destroyModel();
  }

  @action
  async cancel() {
    this.article = await this.model.article;
    super.cancel();
  }
}
