import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class EditArticleRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Artikel aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit article', model);
  }

  model(params) {
    return this.store.findRecord('article', params.id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
