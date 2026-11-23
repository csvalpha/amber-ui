import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DeclarationEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Wijzigen' };

  canAccess(model) {
    return this.abilities.can('edit content declaration', model);
  }

  model() {
    return this.modelFor('declarations.declaration');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
