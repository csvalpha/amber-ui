import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ArticleEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Artikel aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit article', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
