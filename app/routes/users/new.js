import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewUserRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Gebruiker aanmaken' };

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
