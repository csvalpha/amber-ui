import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewArticleRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Artikel aanmaken' };

  canAccess() {
    return this.abilities.can('create articles');
  }

  model() {
    const newArticle = this.store.createRecord('article');
    newArticle.set('author', this.session.currentUser);
    return newArticle;
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
