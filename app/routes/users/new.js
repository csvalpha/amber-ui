import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class UsersNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Gebruiker aanmaken' };

  canAccess() {
    return this.abilities.can('create users');
  }

  model() {
    return this.store.createRecord('user');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
