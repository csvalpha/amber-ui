import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class BatchNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Batch gebruikers uploaden' };

  canAccess() {
    return this.abilities.can('batch upload users');
  }

  model() {
    return this.store.createRecord('user');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
