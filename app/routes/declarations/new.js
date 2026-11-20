import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class DeclarationsNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Declaratie indienen' };

  canAccess() {
    return this.abilities.can('create declarations');
  }

  model() {
    return this.store.createRecord('declaration');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
