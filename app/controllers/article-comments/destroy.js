import DestroyController from 'amber-ui/controllers/application/destroy';
import { action } from '@ember/object';

export default class DestroyArticleCommentController extends DestroyController {
  successMessage = 'Artikelreactie verwijderd!';
  successTransitionTarget = 'articles.show';
  @action
  async destroyModel() {
    this.successTransitionModel = await this.model.article;
    super.destroyModel();
  }

}
