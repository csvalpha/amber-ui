import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class StaticPagesNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Infopagina aanmaken' };

  canAccess() {
    return this.abilities.can('create static-pages');
  }

  model() {
    return this.store.createRecord('static-page');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
