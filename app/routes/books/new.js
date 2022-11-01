import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class NewBookRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Boek aanmaken' };

  canAccess() {
    return this.abilities.can('create books');
  }

  model() {
    return this.store.createRecord('book');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
