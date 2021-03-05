import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewArticleRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Artikel aanmaken' }

  canAccess() {
    return this.can.can('create articles');
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
