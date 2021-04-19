import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewUserRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Gebruiker aanmaken' }

  canAccess() {
    return this.can.can('create users');
  }

  model() {
    return this.store.createRecord('user');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
