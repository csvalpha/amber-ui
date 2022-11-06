import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class StaticPageEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Infopagina aanpassen' };

  canAccess() {
    return this.abilities.can('edit static-pages');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
